package auth

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"api/cache"
	"api/db"
	"api/route/apiresponse"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

const tokenExpiration = 5 * time.Minute

var jwtKey = []byte("abcdefg")

type jwtClaim struct {
	from string
	jwt.RegisteredClaims
}

func generateJwtToken(from string) (string, error) {
	expirationTime := time.Now().Add(tokenExpiration)
	claims := &jwtClaim{
		from: from,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func Register(c *gin.Context) {
	var input db.TyUser
	var err error

	if err = c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusOK, apiresponse.NewInvParam(err))
		return
	}

	var user db.TyUser

	if result := db.DB.Where(&input).First(&user); errors.Is(result.Error, gorm.ErrRecordNotFound) {
		// register to db
		if err = db.DB.Create(&input).Error; err != nil {
			c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
			return
		}

	} else if result.Error != nil {
		c.JSON(http.StatusOK, apiresponse.NewInternalError(result.Error))
		return
	} else if result.RowsAffected == 1 {
		c.JSON(http.StatusOK, apiresponse.NewDuplicated(errors.New("Already registered")))
		return
	} else if result.RowsAffected > 1 {
		panic(fmt.Sprintf("Duplicated users: %s\n", result.Error.Error()))
	} else {
		panic(result.Error.Error())
	}

	if jwtToken, err := generateJwtToken(input.Phone); err != nil {
		c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
	} else {
		ctx := context.Background()
		if _, s_err := cache.RDB.SetNX(ctx, input.Phone, jwtToken, tokenExpiration).Result(); s_err != nil {
			c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
			return
		}
		c.JSON(http.StatusOK, apiresponse.NewSuccess(gin.H{"token": jwtToken}))
	}
	return
}

type loginInput struct {
	Phone    string `json:"phone" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var input loginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusOK, apiresponse.NewInvParam(err))
		return
	}

	var user db.TyUser
	if err := db.DB.Where(&db.TyUser{Phone: input.Phone, Password: input.Password}).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusOK, apiresponse.NewNotFound(err))
			return
		} else {
			c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
			return

		}
	}

	ctx := context.Background()
	var jwtToken string

	// check whether a token exists
	if token, err := cache.RDB.Get(ctx, user.Phone).Result(); err == redis.Nil {
		// token doesn't exist
		if t, t_err := generateJwtToken(user.Phone); t_err != nil {
			c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
			return
		} else {
			// insert new token to cache
			jwtToken = t
			if _, s_err := cache.RDB.SetNX(ctx, user.Phone, jwtToken, tokenExpiration).Result(); s_err != nil {
				c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
				return
			}
		}
	} else if err != nil {
		// redis get error
		c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
		return
	} else {
		// token exists
		// refresh expiration
		cache.RDB.ExpireGT(ctx, user.Phone, tokenExpiration)
		jwtToken = token
	}
	c.JSON(http.StatusOK, apiresponse.NewSuccess(gin.H{"token": jwtToken}))
}

func ValidationMiddleWare(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	var claim jwtClaim
	if token != "" {
		if _, err := jwt.ParseWithClaims(token, &claim, func(token *jwt.Token) (any, error) {
			return jwtKey, nil
		}); err != nil {
			c.JSON(http.StatusOK, apiresponse.NewAuthError(err))
			c.Abort()
		} else {
			//check if exist in Redis
			ctx := context.Background()
			if s_t, s_err := cache.RDB.Get(ctx, claim.from).Result(); s_t != token || s_err == redis.Nil {
				c.JSON(http.StatusOK, apiresponse.NewAuthError(errors.New("Unauthorized")))
				c.Abort()
			} else if s_err != nil {
				c.JSON(http.StatusOK, apiresponse.NewInternalError(err))
				c.Abort()

			} else {
				c.Next()
			}
		}
	} else {
		c.JSON(http.StatusOK, apiresponse.NewAuthError(errors.New("Unauthorized")))
		c.Abort()
	}
}

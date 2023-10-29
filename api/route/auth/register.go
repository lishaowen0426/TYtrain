package auth

import (
	"context"
	"errors"
	"net/http"
	"time"

	"api/cache"
	"api/db"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/redis/go-redis/v9"
	"gorm.io/gorm"
)

const tokenExpiration = 5 * time.Minute

var jwtKey = []byte("abcdefg")

type JwtClaim struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func generateJwtToken(username string) (string, error) {
	expirationTime := time.Now().Add(tokenExpiration)
	claims := &JwtClaim{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	var input RegisterInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user db.TyUser
	if err := db.DB.Where(&db.TyUser{Username: input.Username, Password: input.Password}).First(&user).Error; errors.Is(err, gorm.ErrRecordNotFound) {
		// register to db
	} else if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Already registered"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "registered"})
}

type loginInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var input loginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var user db.TyUser
	if err := db.DB.Where(&db.TyUser{Username: input.Username, Password: input.Password}).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return

		}
	}

	ctx := context.Background()
	var jwtToken string

	// check whether a token exists
	if token, err := cache.RDB.Get(ctx, user.Username).Result(); err == redis.Nil {
		if t, t_err := generateJwtToken(user.Username); t_err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		} else {
			// insert new token to cache
			jwtToken = t
			if _, s_err := cache.RDB.SetNX(ctx, user.Username, jwtToken, tokenExpiration).Result(); s_err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	} else {
		jwtToken = token
	}

	c.JSON(http.StatusOK, gin.H{"token": jwtToken})
}

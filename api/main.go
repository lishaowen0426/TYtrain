package main

import (
	"net/http"
	"os"
	"path"
	"time"

	"api/cache"
	"api/db"
	"api/route/auth"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/subosito/gotenv"
)

func main() {
	wd, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	root := path.Dir(wd)
	gotenv.Load(root + "/.env")

	db.Connect()
	cache.Connect()

	r := gin.Default()

	// Permit CORS to all
	cors_config := cors.DefaultConfig()
	cors_config.MaxAge = 10 * time.Minute
	cors_config.AllowAllOrigins = true
	r.Use(cors.New(cors_config))

	api := r.Group("/api")

	api.POST("/register", auth.Register)
	api.POST("/login", auth.Login)

	validated := api.Group("/validated")
	validated.Use(auth.ValidationMiddleWare)
	validated.GET("/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "you are validated!"})
	})

	r.Run("0.0.0.0:8010")
}

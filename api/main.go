package main

import (
	"os"
	"path"

	"api/cache"
	"api/db"
	"api/route/auth"
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

	api := r.Group("/api")

	api.POST("/register", auth.Register)
	api.POST("/login", auth.Login)

	r.Run(":8010")
}

package cache

import (
	"os"
	"strconv"

	"github.com/redis/go-redis/v9"
)

var RDB *redis.Client

func Connect() {
	redis_db, err := strconv.Atoi(os.Getenv("REDIS_DB"))
	if err != nil {
		panic(err)
	}
	RDB = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_HOST") + ":" + os.Getenv("REDIS_PORT"),
		Password: os.Getenv("REDIS_PASSWORD"),
		DB:       redis_db,
	})
}

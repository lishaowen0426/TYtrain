package knowledge

import (
	"api/route/apiresponse"
	"errors"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func PaginatedKnowledge(c *gin.Context) {

	if username, exist := c.Get("username"); !exist {
		c.JSON(http.StatusOK, apiresponse.NewInternalError(errors.New("Middleware failed")))

	} else {
		fmt.Printf("username: %s\n", username)
		c.JSON(http.StatusOK, gin.H{"username": username})
	}

}

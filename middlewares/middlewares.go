package middlewares

import (
	"fmt"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
)

func IsAdmin(c *fiber.Ctx) error {
	authorized := validToken(c)

	if !authorized {
		return c.SendStatus(401)
	}

	return c.Next()
}

func validToken(c *fiber.Ctx) bool {
	headers := c.GetReqHeaders()
	authorization := headers["Authorization"]

	if authorization[0] == "" {
		return false
	}

	bearerToken := authorization[0]
	tokenSplit := strings.Split(bearerToken, " ")

	if len(tokenSplit) != 2 || tokenSplit[0] != "Bearer" {
		return false
	}

	tokenString := tokenSplit[1]

	secretKey := os.Getenv("JWT_SECRET_KEY")

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})

	if err != nil {
		log.Error(err)
		return false
	}

	if !token.Valid {
		return false
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return false
	}

	fmt.Println(claims)

	return true
}

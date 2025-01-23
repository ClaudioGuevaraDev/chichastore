package handlers

import (
	"context"

	"github.com/ClaudioGuevaraDev/chichastore/config"
	"github.com/ClaudioGuevaraDev/chichastore/libs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
)

type NewUser struct {
	FullName string `json:"full_name" bson:"full_name"`
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	Phone    string `json:"phone" bson:"phone"`
	RoleID   string `json:"role_id" bson:"role_id"`
}

func SignUp(c *fiber.Ctx) error {
	var user NewUser

	if err := c.BodyParser(&user); err != nil {
		log.Error(err)

		return c.Status(400).JSON(fiber.Map{
			"error": "BODY_PARSER_USER",
		})
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(user.Password), 14)

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "BCRYPT_PASSWORD",
		})
	}

	user.Password = string(bytes)

	mongo, err := libs.MongoDBClient()

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "MONGODB_CLIENT_CONNECTION",
		})
	}

	coll := mongo.Database(config.CHICHASTORE_DB).Collection("users")

	createdUser, err := coll.InsertOne(context.TODO(), user)

	if err != nil {
		log.Error(err)

		return c.Status(400).JSON(fiber.Map{
			"error": "REGISTER_NEW_USER",
		})
	}

	return c.Status(201).JSON(fiber.Map{
		"user_id": createdUser.InsertedID,
	})
}

func SignIn(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

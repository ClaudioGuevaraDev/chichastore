package handlers

import (
	"context"
	"os"
	"time"

	"github.com/ClaudioGuevaraDev/chichastore/config"
	"github.com/ClaudioGuevaraDev/chichastore/libs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/v2/bson"
	"golang.org/x/crypto/bcrypt"
)

type NewUser struct {
	FullName string        `json:"full_name" bson:"full_name"`
	Email    string        `json:"email" bson:"email"`
	Password string        `json:"password" bson:"password"`
	Phone    string        `json:"phone" bson:"phone"`
	RoleID   bson.ObjectID `json:"role_id" bson:"role_id"`
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

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func SignIn(c *fiber.Ctx) error {
	var login Login

	if err := c.BodyParser(&login); err != nil {
		log.Error(err)

		return c.Status(400).JSON(fiber.Map{
			"error": "BODY_PARSER",
		})
	}

	mongo, err := libs.MongoDBClient()

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "MONGODB_CLIENT_CONNECTION",
		})
	}

	coll := mongo.Database(config.CHICHASTORE_DB).Collection("users")

	var user User
	usersFilter := bson.D{{Key: "email", Value: login.Email}}

	if err := coll.FindOne(context.TODO(), usersFilter).Decode(&user); err != nil {
		log.Error(err)

		return c.Status(404).JSON(fiber.Map{
			"error": "USER_NOT_FOUND",
		})
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(login.Password))
	match := err == nil

	if !match {
		log.Error(err)

		return c.Status(401).JSON(fiber.Map{
			"error": "PASSWORD_NOT_MATCH",
		})
	}

	coll = mongo.Database(config.CHICHASTORE_DB).Collection("roles")

	var role Role
	rolesFilter := bson.M{"_id": user.RoleID}

	if err := coll.FindOne(context.TODO(), rolesFilter).Decode(&role); err != nil {
		log.Error(err)

		return c.Status(404).JSON(fiber.Map{
			"error": "ROLE_NOT_FOUND",
		})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":        user.ID,
		"full_name": user.FullName,
		"email":     user.Email,
		"phone":     user.Phone,
		"role":      role.Name,
		"exp":       time.Now().Add(time.Hour * 24).Unix(),
	})

	secretKey := os.Getenv("JWT_SECRET_KEY")

	tokenString, err := token.SignedString([]byte(secretKey))

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "SIGNED_TOKEN",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"token": tokenString,
	})
}

package handlers

import (
	"context"

	"github.com/ClaudioGuevaraDev/chichastore/config"
	"github.com/ClaudioGuevaraDev/chichastore/libs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type User struct {
	ID       bson.ObjectID `json:"_id" bson:"_id"`
	FullName string        `json:"full_name" bson:"full_name"`
	Email    string        `json:"email" bson:"email"`
	Password string        `json:"password" bson:"password"`
	Phone    string        `json:"phone" bson:"phone"`
	RoleID   bson.ObjectID `json:"role_id" bson:"role_id"`
}

func GetAllUsers(c *fiber.Ctx) error {
	mongo, err := libs.MongoDBClient()

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "MONGODB_CLIENT_CONNECTION",
		})
	}

	coll := mongo.Database(config.CHICHASTORE_DB).Collection("users")

	cursor, err := coll.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "FIND_COLLECTION_USERS",
		})
	}

	defer cursor.Close(context.TODO())

	var users []User

	if err := cursor.All(context.TODO(), &users); err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "CURSOR_ALL_USERS",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"users": users,
	})
}

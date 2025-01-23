package handlers

import (
	"context"

	"github.com/ClaudioGuevaraDev/chichastore/config"
	"github.com/ClaudioGuevaraDev/chichastore/libs"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Role struct {
	ID   bson.ObjectID `json:"_id" bson:"_id"`
	Name string        `json:"name" bson:"name"`
}

func GetAllRoles(c *fiber.Ctx) error {
	mongo, err := libs.MongoDBClient()

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "MONGODB_CLIENT_CONNECTION",
		})
	}

	coll := mongo.Database(config.CHICHASTORE_DB).Collection("roles")

	cursor, err := coll.Find(context.TODO(), bson.D{})

	if err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "ROLES_COLLECTION_FIND",
		})
	}

	defer cursor.Close(context.TODO())

	var roles []Role

	if err := cursor.All(context.TODO(), &roles); err != nil {
		log.Error(err)

		return c.Status(500).JSON(fiber.Map{
			"error": "CURSOR_DECODE_ROLES_ERROR",
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"roles": roles,
	})
}

type CreateRoleBody struct {
	Name string `json:"name"`
}

func CreateRole(c *fiber.Ctx) error {
	var body CreateRoleBody

	if err := c.BodyParser(&body); err != nil {
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

	coll := mongo.Database(config.CHICHASTORE_DB).Collection("roles")

	role := Role{Name: body.Name}

	_, err = coll.InsertOne(context.TODO(), role)

	if err != nil {
		log.Error(err)

		return c.Status(400).JSON(fiber.Map{
			"error": "ERROR_CREATE_ROLE",
		})
	}

	return c.SendStatus(201)
}

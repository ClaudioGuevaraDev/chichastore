package main

import (
	"github.com/ClaudioGuevaraDev/chichastore/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	app := fiber.New()

	// Environment Variables
	if err := godotenv.Load(); err != nil {
		log.Error(err)
		panic(err)
	}

	// Middlewares
	app.Use(logger.New())

	// Routes
	routes.RolesRoutes(app)
	routes.AuthRoutes(app)
	routes.UsersRoutes(app)

	app.Listen(":5000")
}

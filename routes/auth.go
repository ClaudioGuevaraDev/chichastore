package routes

import (
	"github.com/ClaudioGuevaraDev/chichastore/handlers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	api := app.Group("/api/auth")

	api.Post("/sign-up", handlers.SignUp)
	api.Post("/sign-in", handlers.SignIn)
}

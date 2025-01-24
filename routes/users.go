package routes

import (
	"github.com/ClaudioGuevaraDev/chichastore/handlers"
	"github.com/ClaudioGuevaraDev/chichastore/middlewares"
	"github.com/gofiber/fiber/v2"
)

func UsersRoutes(app *fiber.App) {
	api := app.Group("/api/users")

	api.Get("/", middlewares.IsAdmin, handlers.GetAllUsers)
}

package routes

import (
	"github.com/ClaudioGuevaraDev/chichastore/handlers"
	"github.com/gofiber/fiber/v2"
)

func RolesRoutes(app *fiber.App) {
	api := app.Group("/api/roles")

	api.Get("/", handlers.GetAllRoles)

	api.Post("/", handlers.CreateRole)
}

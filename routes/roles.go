package routes

import (
	"github.com/ClaudioGuevaraDev/chichastore/handlers"
	"github.com/ClaudioGuevaraDev/chichastore/middlewares"
	"github.com/gofiber/fiber/v2"
)

func RolesRoutes(app *fiber.App) {
	api := app.Group("/api/roles")

	api.Get("/", middlewares.IsAdmin, handlers.GetAllRoles)
	api.Get("/:id", middlewares.IsAdmin, handlers.GetRoleByID)

	api.Post("/", middlewares.IsAdmin, handlers.CreateRole)
}

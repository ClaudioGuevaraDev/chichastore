package handlers

import "github.com/gofiber/fiber/v2"

func SignUp(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

func SignIn(c *fiber.Ctx) error {
	return c.SendStatus(200)
}

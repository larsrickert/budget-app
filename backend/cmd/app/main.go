package main

import (
	"budget-app/internal/server"
	"log"
)

func main() {
	app := server.NewServer()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

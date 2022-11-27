package main

import (
	"app/internal/server"
	"log"
)

func main() {
	app := server.NewServer()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

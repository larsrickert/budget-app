package main

import (
	"budget-app/internal/config"
	"budget-app/internal/server"
	"log"
)

func main() {
	config, err := config.New()
	if err != nil {
		log.Fatal("unable to get app config", err)
	}

	app, err := server.NewServer(*config)
	if err != nil {
		log.Fatal("unable to initialize server", err)
	}

	if err := app.Start(); err != nil {
		log.Fatal("unable to start server", err)
	}
}

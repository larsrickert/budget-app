package config

import "time"

type AppConfig struct {
	TestUser TestUserConfig
}

type TestUserConfig struct {
	Username      string
	Email         string
	Password      string
	ResetInterval time.Duration
}

func New() (*AppConfig, error) {
	config := AppConfig{
		TestUserConfig{
			Username:      "testuser",
			Email:         "test@budget-app.de",
			Password:      "12345678",
			ResetInterval: 1 * time.Hour,
		},
	}

	return &config, nil
}

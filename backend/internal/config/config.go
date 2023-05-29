package config

type AppConfig struct {
	TestUser TestUserConfig
}

type TestUserConfig struct {
	Username string
	Email    string
	Password string
	// Reset interval in hours, must be between 0 and 23
	ResetInterval int8
}

func New() (*AppConfig, error) {
	config := AppConfig{
		TestUserConfig{
			Username:      "testuser",
			Email:         "test@budget-app.de",
			Password:      "12345678",
			ResetInterval: 1,
		},
	}

	return &config, nil
}

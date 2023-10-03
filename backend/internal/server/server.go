package server

import (
	transactionService "budget-app/internal/app/transactions/service"
	userService "budget-app/internal/app/users/service"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	// automatically load migrations
	"budget-app/internal/config"
	_ "budget-app/migrations"
)

type Server struct {
	pb                 *pocketbase.PocketBase
	config             config.AppConfig
	userService        *userService.UserService
	transactionService *transactionService.TransactionService
}

func NewServer(config config.AppConfig) (*Server, error) {
	pb := pocketbase.New()
	if err := pb.Bootstrap(); err != nil {
		return nil, err
	}

	userService := userService.NewUserService(*pb.Dao())
	transactionService := transactionService.NewTransactionService(pb.Dao().DB())

	return &Server{
		pb:                 pocketbase.New(),
		config:             config,
		userService:        userService,
		transactionService: transactionService,
	}, nil
}

func (s *Server) Start() error {
	// register custom routes
	s.pb.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		return s.registerHandlers(e.Router)
	})

	if err := s.registerHooks(); err != nil {
		return err
	}

	migratecmd.MustRegister(s.pb, s.pb.RootCmd, migratecmd.Config{
		Automigrate: true, // auto creates migration files when making collection changes
	})

	s.startPeriodicTestUserCreation()

	// start will block code execution so make sure to execute custom code before this
	if err := s.pb.Start(); err != nil {
		return err
	}

	return nil
}

package server

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	// automatically load migrations
	_ "budget-app/migrations"
)

type Server struct {
	pb *pocketbase.PocketBase
}

func NewServer() *Server {
	return &Server{
		pb: pocketbase.New(),
	}
}

func (s *Server) Start() error {
	// register custom routes
	s.pb.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		return s.registerHandlers(e.Router)
	})

	if err := s.registerHooks(); err != nil {
		return err
	}

	migratecmd.MustRegister(s.pb, s.pb.RootCmd, &migratecmd.Options{
		Automigrate: true, // auto creates migration files when making collection changes
	})

	return s.pb.Start()
}

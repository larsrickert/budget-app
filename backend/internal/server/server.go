package server

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
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

	return s.pb.Start()
}

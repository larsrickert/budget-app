package server

import (
	mailService "app/internal/app/mail/service"
	"log"

	"github.com/pocketbase/pocketbase/core"
)

func (s *Server) registerHooks() error {
	s.pb.OnRecordAfterCreateRequest().Add(func(e *core.RecordCreateEvent) error {
		if e.Record.Collection().Name != "users" {
			return nil
		}

		mailClient := s.pb.NewMailClient()
		mailService := mailService.NewMailService(mailClient)

		err := mailService.SendNewUserAdminMail(s.pb.Settings(), e.Record)
		if err != nil {
			log.Printf("error while sending new user admin email: %s", err)
		}

		return nil
	})

	return nil
}

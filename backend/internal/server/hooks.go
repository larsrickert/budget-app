package server

import (
	mailService "budget-app/internal/app/mail/service"
	"errors"
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/cron"
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

	// prevent changing test user email
	s.pb.OnRecordBeforeRequestEmailChangeRequest().Add(func(e *core.RecordRequestEmailChangeEvent) error {
		if e.Record.Email() == s.config.TestUser.Email {
			return errors.New("you are not allowed to change the test user email")
		}
		return nil
	})

	return nil
}

func (s *Server) startPeriodicTestUserCreation() {
	createUserFunc := func() {
		testUser, err := s.userService.CreateOrResetTestUser(
			s.config.TestUser.Username,
			s.config.TestUser.Email,
			s.config.TestUser.Password,
		)

		if err != nil {
			fmt.Println("error while creating/resetting test user:", err)
		} else {
			fmt.Println("Created/resetted test user, id:", testUser.Id)
		}
	}

	c := cron.New()
	c.MustAdd("testUserJob", fmt.Sprintf("0 */%d * * *", s.config.TestUser.ResetInterval), createUserFunc)
	c.Start()

	// cron is not called immediately, so we manually create the user manually once on app start
	createUserFunc()
}

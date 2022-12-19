package service

import (
	"errors"
	"fmt"
	"net/mail"

	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/settings"
	"github.com/pocketbase/pocketbase/tools/mailer"
)

type MailService struct {
	mailClient mailer.Mailer
}

func NewMailService(mailClient mailer.Mailer) *MailService {
	return &MailService{
		mailClient: mailClient,
	}
}

func (s *MailService) SendNewUserAdminMail(settings *settings.Settings, record *models.Record) error {
	adminEmail := settings.Meta.SenderAddress
	if adminEmail == "" {
		return errors.New("sender address is not set in app settings")
	}

	adminAddress := mail.Address{
		Name:    settings.Meta.SenderName,
		Address: settings.Meta.SenderAddress,
	}

	body := fmt.Sprintf(
		`Hello %s,
		 <br><br>
			User "%s" just created a new account. E-Mail: %s
			`, settings.Meta.SenderName, record.Username(), record.Email(),
	)

	return s.mailClient.Send(&mailer.Message{
		From:    adminAddress,
		To:      adminAddress,
		Subject: "New user registration",
		HTML:    body,
	})
}

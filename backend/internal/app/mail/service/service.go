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

func (s *MailService) sendAdminMail(settings *settings.Settings, subject string, body string) error {
	if settings == nil {
		return errors.New("mail settings must not be nil")
	}

	adminEmail := settings.Meta.SenderAddress
	adminName := settings.Meta.SenderName
	if adminEmail == "" || adminName == "" {
		return errors.New("sender address or name is not set in app settings")
	}

	adminAddress := mail.Address{
		Name:    adminName,
		Address: adminEmail,
	}

	return s.mailClient.Send(&mailer.Message{
		From:    adminAddress,
		To:      []mail.Address{adminAddress},
		Subject: subject,
		HTML:    body,
	})
}

func (s *MailService) SendNewUserAdminMail(settings *settings.Settings, record *models.Record) error {
	if settings == nil {
		return errors.New("mail settings must not be nil")
	}

	body := fmt.Sprintf(
		`Hello %s,
		 <br><br>
			User "%s" just created a new account. E-Mail: %s
			`, settings.Meta.SenderName, record.Username(), record.Email(),
	)

	return s.sendAdminMail(settings, "New user registration", body)
}

package http

import (
	"budget-app/internal/app/transactions/service"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
)

type TransactionHandlers struct {
	service *service.TransactionService
}

func NewTransactionHandlers(service *service.TransactionService) *TransactionHandlers {
	return &TransactionHandlers{
		service: service,
	}
}

func (h *TransactionHandlers) GetTransactionSummary(c echo.Context) error {
	userId := c.PathParam("id")
	dto, err := h.service.GetSummary(userId)
	if err != nil {
		apis.NewBadRequestError("error while calculating transaction summary", nil)
	}

	return c.JSON(http.StatusOK, dto)
}

package http

import (
	"budget-app/internal/app/users/service"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
)

type UserHandlers struct {
	service *service.UserService
}

func NewUserHandlers(service *service.UserService) *UserHandlers {
	return &UserHandlers{
		service: service,
	}
}

func (h *UserHandlers) GetBudgetDevelopment(c echo.Context) error {
	userId := c.PathParam("id")

	checkLengthQuery := c.QueryParamDefault("checkLength", "6")
	checkLength, err := strconv.ParseInt(checkLengthQuery, 10, 8)
	if err != nil || checkLength < 1 || checkLength > 255 {
		return apis.NewBadRequestError("invalid value for query parameter checkLength, value must be an integer between 1 and 255", nil)
	}

	includePast := c.QueryParamDefault("includePast", "true") == "true"

	dto, err := h.service.GetBudgetDevelopment(userId, uint8(checkLength), includePast)
	if err != nil {
		apis.NewBadRequestError("error while calculating budget development", nil)
	}

	return c.JSON(http.StatusOK, dto)
}

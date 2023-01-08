package server

import (
	transactionHttp "budget-app/internal/app/transactions/deliver/http"
	userHttp "budget-app/internal/app/users/deliver/http"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase/apis"
)

func (s *Server) registerHandlers(router *echo.Echo) error {
	router.AddRoute(echo.Route{
		Method: http.MethodGet,
		Path:   "",
		Handler: func(c echo.Context) error {
			return c.String(http.StatusOK, "PocketBase is up and running.")
		},
	})

	// add transaction routes
	transactionHandlers := transactionHttp.NewTransactionHandlers(s.transactionService)

	router.AddRoute(echo.Route{
		Method:  http.MethodGet,
		Path:    "/api/collections/users/records/:id/summary/transactions",
		Handler: transactionHandlers.GetTransactionSummary,
		Middlewares: []echo.MiddlewareFunc{
			apis.RequireAdminOrOwnerAuth("id"),
			apis.ActivityLogger(s.pb),
		},
	})

	// add user routes
	userHandlers := userHttp.NewUserHandlers(s.userService)

	router.AddRoute(echo.Route{
		Method:  http.MethodGet,
		Path:    "/api/collections/users/records/:id/budget-development",
		Handler: userHandlers.GetBudgetDevelopment,
		Middlewares: []echo.MiddlewareFunc{
			apis.RequireAdminOrOwnerAuth("id"),
			apis.ActivityLogger(s.pb),
		},
	})

	return nil
}

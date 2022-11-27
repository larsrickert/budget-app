package service

import (
	"app/pkg/utils"
	"strconv"

	"github.com/pocketbase/dbx"
)

type TransactionService struct {
	builder dbx.Builder
}

type TransactionsSummaryItem struct {
	MonthlyTotal float32 `json:"monthlyTotal"`
}

type TransactionsSummary struct {
	Income                   TransactionsSummaryItem `json:"income"`
	Outcome                  TransactionsSummaryItem `json:"outcome"`
	MonthlyBudget            float32                 `json:"monthlyBudget"`
	BudgetPercentageOfIncome float32                 `json:"budgetPercentageOfIncome"`
}

func NewTransactionService(builder dbx.Builder) *TransactionService {
	return &TransactionService{
		builder: builder,
	}
}

func (s *TransactionService) GetSummary(userId string) (*TransactionsSummary, error) {
	var incomeSum dbx.NullStringMap
	var outcomeSum dbx.NullStringMap

	query := "SELECT SUM(value) FROM transactions WHERE userId={:userId} AND type={:type}"

	s.builder.NewQuery(query + " AND frequency='1'").Bind(dbx.Params{"type": "income", "userId": userId}).One(&incomeSum)
	s.builder.NewQuery(query + " AND frequency='1'").Bind(dbx.Params{"type": "outcome", "userId": userId}).One(&outcomeSum)
	monthlyIncome, _ := strconv.ParseFloat(incomeSum["SUM(value)"].String, 32)
	monthlyOutcome, _ := strconv.ParseFloat(outcomeSum["SUM(value)"].String, 32)
	monthlyBudget := utils.RoundToDecimals(float32(monthlyIncome+monthlyOutcome), 2)

	incomeSummary := TransactionsSummaryItem{MonthlyTotal: float32(monthlyIncome)}
	outcomeSummary := TransactionsSummaryItem{MonthlyTotal: float32(monthlyOutcome)}

	var percentage float32
	if monthlyIncome != 0 {
		percentage = utils.RoundToDecimals(monthlyBudget/float32(monthlyIncome)*100, 2)
	}

	return &TransactionsSummary{
		Income:                   incomeSummary,
		Outcome:                  outcomeSummary,
		MonthlyBudget:            monthlyBudget,
		BudgetPercentageOfIncome: float32(percentage)}, nil
}

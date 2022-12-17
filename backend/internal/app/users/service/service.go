package service

import (
	"app/pkg/utils"
	"strconv"
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/tools/types"
)

type UserService struct {
	builder dbx.Builder
}

type BudgetDevelopment struct {
	Min          BudgetDevelopmentItem   `json:"min"`
	Max          BudgetDevelopmentItem   `json:"max"`
	OnetimeTotal float32                 `json:"onetimeTotal"`
	Items        []BudgetDevelopmentItem `json:"items"`
}

type BudgetDevelopmentItem struct {
	Date   string  `json:"date"`
	Budget float32 `json:"budget"`
}

func NewUserService(builder dbx.Builder) *UserService {
	return &UserService{
		builder: builder,
	}
}

func (s *UserService) GetBudgetDevelopment(userId string, checkLength uint8, includePast bool) (*BudgetDevelopment, error) {
	items := make([]BudgetDevelopmentItem, 0)

	checkDate := time.Now()
	checkEnd := time.Now()
	if includePast {
		var firstTransaction dbx.NullStringMap
		s.builder.NewQuery("SELECT bookingDate FROM transactions WHERE userId={:userId} AND bookingDate!='' ORDER BY bookingDate LIMIT 1").Bind(dbx.Params{"userId": userId}).One(&firstTransaction)
		firstTransactionDate, err := time.Parse(types.DefaultDateLayout, firstTransaction["bookingDate"].String)
		if err == nil {
			checkDate = firstTransactionDate
		}
	}
	checkEnd = checkEnd.AddDate(0, int(checkLength), 0)

	var accountSum dbx.NullStringMap
	s.builder.NewQuery("SELECT SUM(value) FROM accounts WHERE userId={:userId}").Bind(dbx.Params{"userId": userId}).One(&accountSum)
	currentBudget, _ := strconv.ParseFloat(accountSum["SUM(value)"].String, 32)

	transactions := make([]dbx.NullStringMap, 0)
	s.builder.NewQuery("SELECT bookingDate, value, frequency FROM transactions WHERE userId={:userId}").Bind(dbx.Params{"userId": userId}).All(&transactions)

	for i := 0; checkDate.Unix() <= checkEnd.Unix(); i++ {
		var budgetDiff float64

		for _, transaction := range transactions {
			bookingDate, err := time.Parse(types.DefaultDateLayout, transaction["bookingDate"].String)
			// set hours, minutes and seconds to 0
			bookingDate = time.Date(bookingDate.Year(), bookingDate.Month(), bookingDate.Day(), 0, 0, 0, bookingDate.Nanosecond(), bookingDate.Location())

			frequency, _ := strconv.ParseInt(transaction["frequency"].String, 10, 32)
			value, _ := strconv.ParseFloat(transaction["value"].String, 32)

			if err != nil || bookingDate.Day() != checkDate.Day() {
				continue
			}

			year1, month1, day1 := bookingDate.Date()
			year2, month2, day2 := checkDate.Date()

			if year1 == year2 && int(month1) == int(month2) && day1 == day2 {
				budgetDiff += value
				continue
			}

			// check if current checkDate matches transaction bookingDate with considered frequency
			if frequency == 0 || bookingDate.Unix() > checkDate.Unix() {
				continue
			}

			monthDiff := (year2-year1)*12 - int(month1) + int(month2)
			if monthDiff < 0 {
				monthDiff = 0
			}

			// check if transaction frequency matches current checkDate
			if monthDiff%int(frequency) == 0 {
				budgetDiff += value
			}
		}

		// always add item for today
		if budgetDiff != 0 || i == 0 {
			currentBudget += budgetDiff
			items = append(items, BudgetDevelopmentItem{
				Date:   checkDate.Format(types.DefaultDateLayout),
				Budget: utils.RoundToDecimals(float32(currentBudget), 2),
			})
		}

		checkDate = checkDate.AddDate(0, 0, 1)
	}

	var min BudgetDevelopmentItem
	var max BudgetDevelopmentItem

	for _, item := range items {
		if min.Date == "" || item.Budget < min.Budget {
			min = item
		}
		if max.Date == "" || item.Budget > max.Budget {
			max = item
		}
	}

	var onetimeSum dbx.NullStringMap
	s.builder.NewQuery("SELECT SUM(value) FROM transactions WHERE userId={:userId} AND frequency=''").Bind(dbx.Params{"userId": userId}).One(&onetimeSum)
	onetimeTotal, _ := strconv.ParseFloat(onetimeSum["SUM(value)"].String, 32)

	return &BudgetDevelopment{
		Min:          min,
		Max:          max,
		OnetimeTotal: float32(onetimeTotal),
		Items:        items,
	}, nil
}

package service

import (
	"budget-app/pkg/utils"
	"strconv"
	"time"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/types"
)

type UserService struct {
	dao daos.Dao
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

func NewUserService(dao daos.Dao) *UserService {
	return &UserService{
		dao: dao,
	}
}

func (s *UserService) GetBudgetDevelopment(userId string, checkLength uint8, includePast bool) (*BudgetDevelopment, error) {
	items := make([]BudgetDevelopmentItem, 0)

	// TODO: remove builder in favor of dao
	builder := s.dao.DB()

	checkDate := time.Now()
	checkEnd := time.Now()
	if includePast {
		var firstTransaction dbx.NullStringMap
		builder.NewQuery("SELECT bookingDate FROM transactions WHERE userId={:userId} AND bookingDate!='' ORDER BY bookingDate LIMIT 1").Bind(dbx.Params{"userId": userId}).One(&firstTransaction)
		firstTransactionDate, err := time.Parse(types.DefaultDateLayout, firstTransaction["bookingDate"].String)
		if err == nil {
			checkDate = firstTransactionDate
		}
	}
	checkEnd = checkEnd.AddDate(0, int(checkLength), 0)

	var accountSum dbx.NullStringMap
	builder.NewQuery("SELECT SUM(value) FROM accounts WHERE userId={:userId}").Bind(dbx.Params{"userId": userId}).One(&accountSum)
	currentBudget, _ := strconv.ParseFloat(accountSum["SUM(value)"].String, 32)

	transactions := make([]dbx.NullStringMap, 0)
	builder.NewQuery("SELECT bookingDate, value, frequency FROM transactions WHERE userId={:userId}").Bind(dbx.Params{"userId": userId}).All(&transactions)

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
	builder.NewQuery("SELECT SUM(value) FROM transactions WHERE userId={:userId} AND frequency=''").Bind(dbx.Params{"userId": userId}).One(&onetimeSum)
	onetimeTotal, _ := strconv.ParseFloat(onetimeSum["SUM(value)"].String, 32)

	return &BudgetDevelopment{
		Min:          min,
		Max:          max,
		OnetimeTotal: float32(onetimeTotal),
		Items:        items,
	}, nil
}

func (s *UserService) CreateOrResetTestUser(username string, email string, password string) (*models.Record, error) {
	collection, err := s.dao.FindCollectionByNameOrId("users")
	if err != nil {
		return nil, err
	}

	record, _ := s.dao.FindAuthRecordByEmail(collection.Name, email)

	err = s.dao.RunInTransaction(func(txDao *daos.Dao) error {
		if record != nil {
			// delete current test user an all related data
			if err := txDao.DeleteRecord(record); err != nil {
				return err
			}
		}

		record = models.NewRecord(collection)

		// set test data
		record.Load(map[string]any{
			"username":        username,
			"email":           email,
			"emailVisibility": true,
			"verified":        true,
		})

		record.RefreshUpdated()
		record.SetPassword(password)

		if err := txDao.SaveRecord(record); err != nil {
			return err
		}

		if err := s.createTestUserData(txDao, record.Id); err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return nil, err
	}
	return record, nil
}

func (s *UserService) createTestUserData(txDao *daos.Dao, userId string) error {
	accountsCollection, err := txDao.FindCollectionByNameOrId("accounts")
	if err != nil {
		return err
	}

	transactionsCollection, err := txDao.FindCollectionByNameOrId("transactions")
	if err != nil {
		return err
	}

	type TestAccount struct {
		Name  string
		Value float32
	}

	testAccounts := []TestAccount{
		{Name: "Main account", Value: 423.56},
	}

	type TestTransaction struct {
		Name        string
		Value       float32
		Type        string
		BookingDate time.Time
		Frequency   string
	}

	now := time.Now()

	testTransactions := []TestTransaction{
		{Name: "Salary", Value: 1500, Type: "income", Frequency: "1", BookingDate: now.AddDate(0, 0, 4)},
		{Name: "Job bonus", Value: 500, Type: "income", Frequency: "", BookingDate: now.AddDate(0, 2, 15)},
		{Name: "Rent", Value: -500, Type: "outcome", Frequency: "1", BookingDate: now.AddDate(0, 0, 6)},
		{Name: "Groceries", Value: -300, Type: "outcome", Frequency: "1", BookingDate: now.AddDate(0, 0, 7)},
		{Name: "Netflix", Value: -18, Type: "outcome", Frequency: "1", BookingDate: now.AddDate(0, 0, 8)},
		{Name: "Gym", Value: -30, Type: "outcome", Frequency: "1", BookingDate: now.AddDate(0, 0, 10)},
		{Name: "Savings", Value: -100, Type: "outcome", Frequency: "1", BookingDate: now.AddDate(0, 0, 12)},
		{Name: "New TV", Value: -800, Type: "outcome", Frequency: "", BookingDate: now.AddDate(0, 0, 20)},
		{Name: "Insurance", Value: -600, Type: "outcome", Frequency: "12", BookingDate: now.AddDate(0, 2, 0)},
		{Name: "Donations", Value: -123, Type: "outcome", Frequency: "3", BookingDate: now.AddDate(0, 3, 0)},
	}

	// add accounts
	for _, v := range testAccounts {
		record := models.NewRecord(accountsCollection)
		record.Load(map[string]any{
			"name":   v.Name,
			"value":  v.Value,
			"userId": userId,
		})
		if err := txDao.SaveRecord(record); err != nil {
			return err
		}
	}

	// add transactions
	for _, v := range testTransactions {
		record := models.NewRecord(transactionsCollection)
		record.Load(map[string]any{
			"name":        v.Name,
			"value":       v.Value,
			"type":        v.Type,
			"frequency":   v.Frequency,
			"bookingDate": v.BookingDate.Format(types.DefaultDateLayout),
			"userId":      userId,
		})
		if err := txDao.SaveRecord(record); err != nil {
			return err
		}
	}

	return nil
}

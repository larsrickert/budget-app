/**
 * Calculates the monthly statistics for the given transactions.
 *
 * @param transactions Monthly transactions
 */
export const calculateMonthlyTransactionStatistics = (transactions: Transaction[]) => {
  const incomeTransactions = transactions.filter(({ type }) => type === "income");
  const outcomeTransactions = transactions.filter(({ type }) => type === "outcome");

  const income = calculateTotalSum(incomeTransactions);
  const outcome = calculateTotalSum(outcomeTransactions);

  // since the outcome total is negative, we need to add them here to subtract the outcome from the income
  const budget = income + outcome;

  const statistics: TransactionStatistics = {
    monthlyBudget: budget,
    income: { monthlyTotal: income },
    outcome: { monthlyTotal: outcome },
  };

  return statistics;
};

/**
 * Gets the next booking date (depending on the frequency).
 * If undefined, the transaction should not be repeated (either because no frequency is set or the end date is reached).
 */
export const getNextBookingDate = (
  transaction: Pick<Transaction, "bookingDate" | "frequency" | "endDate">,
) => {
  if (!transaction.bookingDate || !transaction.frequency) return;

  const date = removeTimeFromDate(new Date(parseDatabaseDate(transaction.bookingDate)));
  date.setMonth(date.getMonth() + transaction.frequency);

  // check if new date exceeds the end date
  const endDate = transaction.endDate
    ? setTimeToDayEnd(parseDatabaseDate(transaction.endDate))
    : undefined;
  if (endDate && endDate.getTime() < date.getTime()) return;

  return date;
};

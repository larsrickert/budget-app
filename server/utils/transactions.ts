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

export const getNextBookingDate = (transaction: Pick<Transaction, "bookingDate" | "frequency">) => {
  if (!transaction.bookingDate || !transaction.frequency) return;
  const date = new Date(transaction.bookingDate);
  date.setMonth(date.getMonth() + transaction.frequency);
  return date;
};

export type CalculateBudgetDevelopmentOptions = {
  /**
   * All available accounts of the user.
   */
  accounts: Account[];
  /**
   * All available transactions of the user.
   */
  transactions: Transaction[];
  /**
   * Check length in months.
   */
  checkLength: number;
  /**
   * Whether to include transactions that are in the past.
   */
  includePast: boolean;
};

export async function calculateBudgetDevelopment(
  options: CalculateBudgetDevelopmentOptions,
): Promise<BudgetDevelopment> {
  const items: BudgetDevelopmentItem[] = [];

  let checkDate = removeTimeFromDate(new Date());

  const checkEnd = new Date();
  checkEnd.setMonth(checkEnd.getMonth() + options.checkLength);

  if (options.includePast) {
    const firstTransaction = options.transactions
      .slice()
      .filter(
        (
          t,
        ): t is Omit<typeof t, "bookingDate"> & {
          bookingDate: NonNullable<typeof t.bookingDate>;
        } => !!t.bookingDate,
      )
      .sort(
        (a, b) =>
          parseDatabaseDate(a.bookingDate).getTime() - parseDatabaseDate(b.bookingDate).getTime(),
      )
      .at(0);

    if (firstTransaction) {
      checkDate = parseDatabaseDate(firstTransaction.bookingDate);
    }
  }

  let currentBudget = calculateTotalSum(options.accounts);

  // --- 3. Iterate Day-by-Day and Calculate Budget ---
  let isFirstDay = true;
  while (checkDate.getTime() <= checkEnd.getTime()) {
    let budgetDiff = 0;

    for (const transaction of options.transactions) {
      if (!transaction.bookingDate) continue;

      const bookingDate = parseDatabaseDate(transaction.bookingDate);
      const endDate = transaction.endDate
        ? setTimeToDayEnd(parseDatabaseDate(transaction.endDate))
        : undefined;
      if (endDate && endDate.getTime() < checkDate.getTime()) continue;

      // only consider transactions that occur on the same day of the month as the current checkDate
      if (bookingDate.getDate() !== checkDate.getDate()) {
        continue;
      }

      // Direct match: If the transaction date is the exact same as the checkDate.
      if (bookingDate.getTime() === checkDate.getTime()) {
        budgetDiff += transaction.value;
        continue;
      }

      // Frequency match: Check for recurring transactions.
      // A transaction is recurring if frequency is a positive number and its date is in the past.
      if (
        !transaction.frequency ||
        transaction.frequency <= 0 ||
        bookingDate.getTime() > checkDate.getTime()
      ) {
        continue;
      }

      const monthDiff =
        (checkDate.getFullYear() - bookingDate.getFullYear()) * 12 +
        (checkDate.getMonth() - bookingDate.getMonth());

      // Check if the transaction recurs on the current month.
      if (monthDiff > 0 && monthDiff % transaction.frequency === 0) {
        budgetDiff += transaction.value;
      }
    }

    // Add an item if the budget changed, or if it's the very first day of the calculation.
    if (budgetDiff !== 0 || isFirstDay) {
      currentBudget += budgetDiff;
      items.push({
        date: formatToDateString(checkDate),
        budget: roundToDecimals(currentBudget, 2),
      });
      isFirstDay = false;
    }

    // Move to the next day.
    checkDate.setDate(checkDate.getDate() + 1);
  }

  // --- 4. Find Min and Max Budget Items ---
  const min = items.reduce((prev, curr) => (prev.budget < curr.budget ? prev : curr));
  const max = items.reduce((prev, curr) => (prev.budget > curr.budget ? prev : curr));

  // --- 5. Calculate One-Time Transaction Total ---
  const onetimeTransactions = options.transactions.filter(({ bookingDate }) => !bookingDate);
  const onetimeTotal = calculateTotalSum(onetimeTransactions);

  return {
    min,
    max,
    onetimeTotal,
    items,
  };
}

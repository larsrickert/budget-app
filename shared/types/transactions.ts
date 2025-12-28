export type Transaction = typeof schema.transactions.$inferSelect;
export type NewTransaction = typeof schema.transactions.$inferInsert;
export type TransactionType = (typeof schema.transactionTypeEnum.enumValues)[number];

export type TransactionStatisticItem = {
  monthlyTotal: number;
};

export type TransactionStatistics = {
  monthlyBudget: number;
  income: TransactionStatisticItem;
  outcome: TransactionStatisticItem;
};

export type BudgetDevelopment = {
  min: BudgetDevelopmentItem;
  max: BudgetDevelopmentItem;
  onetimeTotal: number;
  items: BudgetDevelopmentItem[];
};

export type BudgetDevelopmentItem = {
  date: string;
  budget: number;
};

export type OverdueTransaction = {
  transaction: Transaction;
  /**
   * Next booking date. If undefined, the transaction is a onetime transaction
   * and will be deleted after the current date.
   */
  nextBookingDate?: string;
};

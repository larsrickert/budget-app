export const getTransactionValue = (type: TransactionType, value: number) => {
  const absValue = Math.abs(value);
  return type === "income" ? absValue : -absValue;
};

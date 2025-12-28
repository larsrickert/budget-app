import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  // get all monthly transactions
  const transactions = await db
    .select()
    .from(schema.transactions)
    .where(and(eq(schema.transactions.userId, user.id), eq(schema.transactions.frequency, 1)));

  return calculateMonthlyTransactionStatistics(transactions);
});

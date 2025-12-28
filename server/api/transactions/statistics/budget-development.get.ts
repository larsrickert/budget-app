import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const accounts = await db
    .select()
    .from(schema.accounts)
    .where(eq(schema.accounts.userId, user.id));

  const transactions = await db
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.userId, user.id));

  return calculateBudgetDevelopment({
    accounts,
    transactions,
    checkLength: 6,
    includePast: true,
  });
});

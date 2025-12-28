import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const id = getIDRouterParam(event);
  const [transaction] = await db
    .select()
    .from(schema.transactions)
    .where(eq(schema.transactions.id, id));

  if (!transaction || transaction.userId !== user.id) {
    throw createError({
      message: "You are not allowed to access this transaction",
      status: 403,
    });
  }

  return transaction;
});

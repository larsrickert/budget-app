import { and, asc, desc, eq, isNull, lte } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const transactions = await db
    .select()
    .from(schema.transactions)
    .where(
      and(
        eq(schema.transactions.userId, user.id),
        lte(schema.transactions.bookingDate, new Date().toISOString()),
      ),
    )
    .orderBy(
      desc(isNull(schema.transactions.bookingDate)), // order null values first
      asc(schema.transactions.bookingDate),
    );

  return transactions.map<OverdueTransaction>((transaction) => {
    const nextDate = getNextBookingDate(transaction);
    return {
      transaction,
      nextBookingDate: nextDate?.toISOString(),
    };
  });
});

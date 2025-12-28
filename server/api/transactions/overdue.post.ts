import { and, eq } from "drizzle-orm";
import z from "zod";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const body = await readValidatedBody(
    event,
    z.object({
      ids: z.array(z.int()),
    }).parse,
  );

  await db.transaction(async (tx) => {
    await Promise.all(
      body.ids.map(async (id) => {
        const [transaction] = await tx
          .select()
          .from(schema.transactions)
          .where(and(eq(schema.transactions.userId, user.id), eq(schema.transactions.id, id)));

        if (!transaction) return;

        const newBookingDate = getNextBookingDate(transaction);

        if (!newBookingDate) {
          await tx.delete(schema.transactions).where(eq(schema.transactions.id, id));
        } else {
          await tx
            .update(schema.transactions)
            .set({ bookingDate: newBookingDate.toISOString() })
            .where(eq(schema.transactions.id, id));
        }
      }),
    );
  });
});

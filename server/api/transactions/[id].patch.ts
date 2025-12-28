import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";

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
      message: "You are not allowed to edit this transaction",
      status: 403,
    });
  }

  const updateSchema = createUpdateSchema(schema.transactions, {
    name: (schema) => schema.trim(),
    notes: (schema) => schema.trim(),
    frequency: (schema) => schema.min(1),
  }).omit({
    id: true,
    createdAt: true,
    userId: true,
  });
  const body = await readValidatedBody(event, updateSchema.parse);

  // ensure correct value sign depending on type
  body.value = getTransactionValue(body.type ?? transaction.type, body.value ?? transaction.value);

  const [updatedTransaction] = await db
    .update(schema.transactions)
    .set(body)
    .where(eq(schema.transactions.id, id))
    .returning();

  return updatedTransaction;
});

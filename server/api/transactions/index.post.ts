import { createInsertSchema } from "drizzle-zod";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const insertSchema = createInsertSchema(schema.transactions, {
    name: (schema) => schema.trim(),
    notes: (schema) => schema.trim(),
    frequency: (schema) => schema.min(1),
  }).omit({
    id: true,
    createdAt: true,
    userId: true,
  });

  const body = await readValidatedBody(event, insertSchema.parse);

  // ensure correct value sign depending on type
  body.value = getTransactionValue(body.type, body.value);

  const [newTransaction] = await db
    .insert(schema.transactions)
    .values({ userId: user.id, ...body })
    .returning();

  return newTransaction;
});

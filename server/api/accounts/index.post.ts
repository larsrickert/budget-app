import { createInsertSchema } from "drizzle-zod";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const insertSchema = createInsertSchema(schema.accounts, {
    name: (schema) => schema.trim(),
    notes: (schema) => schema.trim(),
  }).omit({
    id: true,
    createdAt: true,
    userId: true,
  });

  const body = await readValidatedBody(event, insertSchema.parse);

  const [newAccount] = await db
    .insert(schema.accounts)
    .values({ userId: user.id, ...body })
    .returning();

  return newAccount;
});

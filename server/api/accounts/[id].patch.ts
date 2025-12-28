import { eq } from "drizzle-orm";
import { createUpdateSchema } from "drizzle-zod";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const id = getIDRouterParam(event);
  const [account] = await db.select().from(schema.accounts).where(eq(schema.accounts.id, id));

  if (!account || account.userId !== user.id) {
    throw createError({
      message: "You are not allowed to edit this account",
      status: 403,
    });
  }

  const updateSchema = createUpdateSchema(schema.accounts, {
    name: (schema) => schema.trim(),
    notes: (schema) => schema.trim(),
  }).omit({
    id: true,
    createdAt: true,
    userId: true,
  });
  const body = await readValidatedBody(event, updateSchema.parse);

  const [updatedAccount] = await db
    .update(schema.accounts)
    .set(body)
    .where(eq(schema.accounts.id, id))
    .returning();

  return updatedAccount;
});

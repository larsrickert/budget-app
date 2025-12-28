import { asc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const accounts = await db
    .select()
    .from(schema.accounts)
    .where(eq(schema.accounts.userId, user.id))
    .orderBy(asc(schema.accounts.createdAt));

  return accounts;
});

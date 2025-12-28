import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { user } = await requireUser(event);
  const db = useDrizzle();

  const id = getIDRouterParam(event);
  const [account] = await db.select().from(schema.accounts).where(eq(schema.accounts.id, id));

  // if account does not exist, we consider the delete request to be successful
  if (!account) return;

  if (account.userId !== user.id) {
    throw createError({
      message: "You are not allowed to delete this account",
      status: 403,
    });
  }

  await db.delete(schema.accounts).where(eq(schema.accounts.id, id));
});

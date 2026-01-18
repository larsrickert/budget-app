import type { UserSession } from "#auth-utils";
import { eq } from "drizzle-orm";
import type { H3Event } from "h3";

export const requireUser = async (event: H3Event) => {
  const session = await requireUserSession(event);

  const db = useDrizzle();

  const users = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, session.user.email))
    .limit(1);

  const user = users[0];

  if (!user) {
    throw createError({
      message: "User data not found in database",
      statusCode: 401,
    });
  }

  return { session, user };
};

/**
 * Utility for handling an successful OAuth login in a unified way.
 * Will set the user session, upsert the user into the database and redirect him.
 *
 * Useful for handling multiple OAuth providers in the same way.
 */
export const handleOAuthLoginSuccess = async (
  event: H3Event,
  data: Parameters<typeof setUserSession>[1],
) => {
  const session = await setUserSession(event, data);
  await upsertUserToDatabase(session);
  return sendRedirect(event, "/dashboard");
};

/**
 * Insert (or updates if already exists) the given user into the database.
 */
const upsertUserToDatabase = async ({ user }: UserSession) => {
  if (!user) return;
  const db = useDrizzle();

  await db.insert(schema.users).values(user).onConflictDoUpdate({
    target: schema.users.email,
    set: user,
  });
};

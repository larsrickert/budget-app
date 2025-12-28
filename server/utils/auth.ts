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

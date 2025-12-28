import type { UserSession } from "#auth-utils";

// currently needed to provide intellisense for session below
type Session = Pick<UserSession, "user" | "secure">;

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const session = await setUserSession(event, {
      user: {
        name: user.name,
        email: user.email ?? "",
        picture: user.avatar_url,
      },
    } satisfies Session);

    await upsertUserToDatabase(session);

    return sendRedirect(event, "/dashboard");
  },
});

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

import { handleOAuthLoginSuccess } from "~~/server/utils/auth";

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    return handleOAuthLoginSuccess(event, {
      user: {
        name: user.name,
        email: user.email ?? "",
        picture: user.avatar_url,
      },
    });
  },
});

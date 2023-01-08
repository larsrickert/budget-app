import type { LoginPayload } from "./stores/auth";

export const config = {
  api: {
    host: import.meta.env.VITE_API_HOST || "",
    testUser: {
      usernameOrEmail: "testuser",
      password: "12345678",
    } as LoginPayload,
  },
};

export const config = {
  api: {
    host: import.meta.env.VITE_API_HOST || "",
    testUser: {
      username: "testuser",
      email: "test@budget-app.de",
      password: "12345678",
    },
  },
};

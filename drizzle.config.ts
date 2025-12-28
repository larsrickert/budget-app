import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dbCredentials: {
    database: process.env.NUXT_DB_NAME!,
    host: process.env.NUXT_DB_HOST!,
    user: process.env.NUXT_DB_USER!,
    password: process.env.NUXT_DB_PASSWORD!,
    ssl: process.env.NUXT_DB_HOST !== "localhost",
  },
});

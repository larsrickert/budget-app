import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";

export default defineNitroPlugin(async () => {
  try {
    console.log("Migrating database...");

    const migrationsFolder = path.join(
      process.env.NODE_ENV === "production" ? ".output" : ".",
      "/server/database/migrations",
    );

    const db = useDrizzle();
    await migrate(db, { migrationsFolder });
    console.log("✅ Successfully migrated database!");
  } catch (e) {
    console.error("❌ Database migration failed:", e);
  }
});

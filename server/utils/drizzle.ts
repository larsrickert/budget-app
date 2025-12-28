import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "../database/schema";
export { schema };

let db: NodePgDatabase<typeof schema>;

export const useDrizzle = () => {
  if (db) return db;

  const config = useRuntimeConfig();
  const pool = new Pool({
    user: config.db.user,
    database: config.db.name,
    password: config.db.password,
    host: config.db.host,
    max: 2,
  });
  db = drizzle(pool);
  return db;
};

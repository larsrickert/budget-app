import { date, integer, pgEnum, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

// re-usable data types
const createdAt = timestamp("created_at", { mode: "string" }).defaultNow().notNull();
const id = integer().primaryKey().generatedByDefaultAsIdentity();
const userId = integer()
  .references(() => users.id)
  .notNull();

export const users = pgTable("users", {
  id,
  createdAt,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  picture: varchar(),
});

export const accounts = pgTable("accounts", {
  id,
  createdAt,
  userId,
  name: varchar({ length: 255 }).notNull(),
  value: real().notNull(),
  notes: varchar({ length: 2048 }),
});

export const transactionTypeEnum = pgEnum("transactionType", ["income", "outcome"]);

export const transactions = pgTable("transactions", {
  id,
  createdAt,
  userId,
  name: varchar({ length: 255 }).notNull(),
  value: real().notNull(),
  type: transactionTypeEnum().notNull(),
  frequency: integer(),
  bookingDate: date("booking_date", { mode: "string" }),
  endDate: date("end_date", { mode: "string" }),
  notes: varchar(),
});

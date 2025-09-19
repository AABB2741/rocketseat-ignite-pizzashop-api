import { createId } from "@paralleldrive/cuid2";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["manager", "customer"]);

export const users = pgTable("users", {
  id: text().primaryKey().$defaultFn(createId),
  name: text().notNull(),
  email: text().notNull().unique(),
  phone: text(),
  role: userRole("role").notNull().default("customer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof users>;
export type UserInput = InferInsertModel<typeof users>;

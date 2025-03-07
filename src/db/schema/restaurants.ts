import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users";

export const restaurants = pgTable("restaurants", {
  id: text("id").$defaultFn(createId).primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  managerId: text("manager_id").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const restaurantsRelations = relations(restaurants, ({ one }) => ({
  manager: one(users, {
    fields: [restaurants.managerId],
    references: [users.id],
    relationName: "restaurant_manager",
  }),
}));

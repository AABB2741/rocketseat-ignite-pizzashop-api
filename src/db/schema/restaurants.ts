import { createId } from "@paralleldrive/cuid2";
import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users.ts";

export const restaurants = pgTable("restaurants", {
  id: text().primaryKey().$defaultFn(createId),
  managerId: text("manager_id").references(() => users.id, {
    onDelete: "set null",
  }),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const restaurantRelations = relations(restaurants, ({ one }) => ({
  manager: one(users, {
    fields: [restaurants.managerId],
    references: [users.id],
    relationName: "restaurant_manager",
  }),
}));

export type Restaurant = InferSelectModel<typeof restaurants>;
export type RestaurantInput = InferInsertModel<typeof restaurants>;

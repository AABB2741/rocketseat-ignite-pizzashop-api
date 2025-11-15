import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "./users.ts";

export const authLinks = pgTable("auth_links", {
  id: text().primaryKey().$defaultFn(createId),
  code: text().notNull().unique(),
  userId: text()
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/db/schema/index.ts";
import { env } from "@/env.ts";

export const db = drizzle(env.DATABASE_URL, {
  casing: "snake_case",
  schema,
});

import { defineConfig } from "drizzle-kit";

import { env } from "@/env.ts";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  casing: "snake_case",
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});

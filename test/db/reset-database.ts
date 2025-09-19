import chalk from "chalk";

import { restaurants, users } from "@/db/schema/index.ts";
import { db } from "@/lib/drizzle.ts";

export async function resetDatabase() {
  const startedAt = Date.now();

  await db.delete(restaurants);
  await db.delete(users);

  const finishedAt = Date.now();
  console.log(
    chalk.greenBright(
      `Database reset completed in ${finishedAt - startedAt}ms`,
    ),
  );
}

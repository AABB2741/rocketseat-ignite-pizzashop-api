import { makeRestaurant } from "@test/factories/make-restaurant.ts";
import { makeUser } from "@test/factories/make-user.ts";
import chalk from "chalk";

import type { Restaurant, User } from "@/db/schema/index.ts";
import * as schema from "@/db/schema/index.ts";
import { db } from "@/lib/drizzle.ts";

const users: User[] = [];
const restaurants: Restaurant[] = [];
const startedAt = Date.now();

for (let i = 1; i <= 5; i++) {
  users.push(makeUser());
}

for (const user of users) {
  for (let i = 1; i <= 2; i++) {
    restaurants.push(
      makeRestaurant({
        managerId: user.id,
      }),
    );
  }
}

await db.insert(schema.users).values(users);
console.log(`✅ ${users.length} users inserted`);
await db.insert(schema.restaurants).values(restaurants);
console.log(`✅ ${restaurants.length} restaurants inserted`);

const finishedAt = Date.now();
console.log();
console.log(
  chalk.greenBright.bold(`🌱 Seeding completed in ${finishedAt - startedAt}ms`),
);

process.exit();

import Elysia from "elysia";
import z from "zod";

import { restaurants, users } from "@/db/schema/index.ts";
import { db } from "@/lib/drizzle.ts";

export const registerRestaurant = new Elysia().post(
  "/restaurants",
  async ({ status, body }) => {
    const { restaurantName, managerName, email, phone } = body;

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: "manager",
      })
      .returning();

    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager?.id,
    });

    return status(204);
  },
  {
    body: z.object({
      restaurantName: z.string(),
      managerName: z.string(),
      phone: z.string(),
      email: z.email(),
    }),
    response: {},
  },
);

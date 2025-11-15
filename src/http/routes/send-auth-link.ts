import { createId } from "@paralleldrive/cuid2";
import Elysia from "elysia";
import z from "zod";

import { authLinks } from "@/db/schema/index.ts";
import { env } from "@/env.ts";
import { db } from "@/lib/drizzle.ts";

export const sendAuthLink = new Elysia().post(
  "/authenticate",
  async ({ body }) => {
    const { email } = body;

    const userFromEmail = await db.query.users.findFirst({
      where: (fields, { eq }) => eq(fields.email, email),
    });

    if (!userFromEmail) {
      throw new Error("User not found.");
    }

    const code = createId();

    await db.insert(authLinks).values({
      userId: userFromEmail.id,
      code,
    });

    const link = new URL("/auth-links/authenticate", env.API_BASE_URL);
    link.searchParams.set("code", code);
    link.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

    console.log(link.toString());
  },
  {
    body: z.object({
      email: z.email(),
    }),
  },
);

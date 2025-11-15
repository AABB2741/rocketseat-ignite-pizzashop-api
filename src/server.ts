import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import openapi from "@elysiajs/openapi";
import Elysia, { t } from "elysia";
import z from "zod";

import { env } from "./env.ts";
import { registerRestaurant } from "./http/routes/register-restaurant.ts";
import { sendAuthLink } from "./http/routes/send-auth-link.ts";

const app = new Elysia()
  .use(
    openapi({
      path: "/docs",
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    }),
  )
  .use(
    jwt({
      secret: env.JWT_SECRET,
      schema: t.Object({
        sub: t.String(),
        restaurantId: t.Optional(t.String()),
      }),
    }),
  )
  .use(cookie())
  .get("/", "Ok")
  .use(registerRestaurant)
  .use(sendAuthLink);

app.listen(3333, () => {
  console.log("Server running at http://localhost:3333");
});

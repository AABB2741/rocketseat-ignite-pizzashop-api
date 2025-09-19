import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import { userRole, type User } from "@/db/schema/index.ts";

export function makeUser(override?: Partial<User>) {
  const data: User = {
    id: createId(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: faker.helpers.arrayElement(userRole.enumValues),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...override,
  };

  return data;
}

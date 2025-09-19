import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

import type { Restaurant } from "@/db/schema/index.ts";

export function makeRestaurant(override?: Partial<Restaurant>) {
  const data: Restaurant = {
    id: createId(),
    managerId: faker.datatype.boolean() ? createId() : null,
    name: faker.company.name(),
    description: faker.datatype.boolean() ? faker.lorem.paragraph() : null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    ...override,
  };

  return data;
}

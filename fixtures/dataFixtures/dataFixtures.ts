import { faker } from "@faker-js/faker";
import { baseFixtures } from "../baseFixtures";

export const dataFixtures = baseFixtures.extend<{
  createUserAPIData: { userName: string; password: string };
}>({
  createUserAPIData: async ({}, use) => {
    const output = {
      userName: faker.internet.userName(),
      password: `${faker.internet.password()}*`,
    };
    await use(output);
  },
});

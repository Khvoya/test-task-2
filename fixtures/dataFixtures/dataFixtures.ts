import { faker } from "@faker-js/faker";
import { baseFixtures } from "../baseFixtures";

export const dataFixtures = baseFixtures.extend<{
  createUserAPIData: { userName: string; password: string };
}>({
  createUserAPIData: async ({}, use) => {
    const output = {
      userName: faker.internet.userName(),
      // faker не всегда добавляет цифру и символ в пароль
      password: `${faker.internet.password()}*1`,
    };
    await use(output);
  },
});

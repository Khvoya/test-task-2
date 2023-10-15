import { userResponseType } from "../../src/api/types";
import { dataFixtures } from "../dataFixtures/dataFixtures";

export const apiPreFixtures = dataFixtures.extend<{
  createUserByApi: userResponseType;
  authorizeUserByApi: { userId: userResponseType["userID"] };
}>({
  createUserByApi: async ({ bookstoreAPI, createUserAPIData, page }, use) => {
    const response = await bookstoreAPI.createUser(
      createUserAPIData.userName,
      createUserAPIData.password,
    );
    // Юзер создается на сервере не мгновенно, поэтому небольшой таймаут для стабильности
    await page.waitForTimeout(3000);
    await use(response);
  },
  authorizeUserByApi: async (
    { bookstoreAPI, createUserAPIData, createUserByApi, context },
    use,
  ) => {
    const response = await bookstoreAPI.authorizeUser(
      createUserAPIData.userName,
      createUserAPIData.password,
    );
    await context.setExtraHTTPHeaders({
      Authorization: `Bearer ${response.token}`,
      "Content-Type": "application/json",
    });
    await use({ userId: createUserByApi.userID });
  },
});

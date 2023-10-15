import { userResponseType } from "../../src/api/types";
import { dataFixtures } from "../dataFixtures/dataFixtures";

export const apiPreFixtures = dataFixtures.extend<{
  createUserByApi: userResponseType;
  authorizeUserByApi: string;
}>({
  createUserByApi: async ({ bookstoreAPI, createUserAPIData }, use) => {
    const response = await bookstoreAPI.createUser(
      createUserAPIData.userName,
      createUserAPIData.password,
    );
    await use(response);
  },
  authorizeUserByApi: async (
    { bookstoreAPI, createUserAPIData, context },
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
    await use(response.token);
  },
});

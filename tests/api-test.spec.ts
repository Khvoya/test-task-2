import { expect } from "@playwright/test";
import test from "../fixtures/allFixtures";
import { userResponseType } from "../src/api/types";

test("Проверка GET /Account/v1/User/", async ({
  createUserAPIData,
  createUserByApi,
  authorizeUserByApi,
  bookstoreAPI,
}) => {
  let getUserResponse: { json: userResponseType; status: number };
  const userId = createUserByApi.userID;

  await test.step(`Получаем ответ по GET для пользователя ${createUserAPIData.userName}`, async () => {
    getUserResponse = await bookstoreAPI.getUser(userId);
  });

  await test.step("Проверяем, что ответ содержит верные ID и имя пользователя", async () => {
    expect(getUserResponse.json.userId).toBe(userId);
    expect(getUserResponse.json.username).toBe(createUserAPIData.userName);
  });

  await test.step("Проверяем, что ответ содержит код 200", async () => {
    expect(getUserResponse.status).toBe(200);
  });
});

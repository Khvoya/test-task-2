import { expect } from "@playwright/test";
import test from "../fixtures/allFixtures";

test("Проверка формы авторизации", async ({ mainPage, createUserAPIData }) => {
  await test.step("Открыть главную страницу", async () => {
    await mainPage.openMainPage();
  });

  await test.step("Нажать на кнопку Authorize", async () => {
    await mainPage.openAuthModal();
  });

  await test.step("Заполнить форму Basic Authorization", async () => {
    await mainPage.authModal.fillBasicAuthorizeForm(
      createUserAPIData.userName,
      createUserAPIData.password,
    );
  });

  await test.step("Нажать Authorize", async () => {
    await mainPage.authModal.submitBasicForm();
  });

  await test.step("Проверить наличие кнопки Logout", async () => {
    await expect(mainPage.authModal.logoutButton).toBeVisible();
  });

  await test.step("Закрыть форму", async () => {
    await mainPage.authModal.closeModal();
  });

  await test.step("Проверить, что форма закрылась", async () => {
    await expect(mainPage.authModal.root).toBeHidden();
  });
});

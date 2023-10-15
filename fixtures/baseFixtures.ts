import { test } from "@playwright/test";
import { BookstoreAPI } from "../src/api/bookstoreAPI";
import { BookstoreMainPage } from "../src/ui/bookstoreMainPage";

export const baseFixtures = test.extend<{
  goToBasePage: void;
  bookstoreAPI: BookstoreAPI;
  mainPage: BookstoreMainPage;
}>({
  bookstoreAPI: async ({ page }, use) => {
    await use(new BookstoreAPI(page));
  },

  mainPage: async ({ page, baseURL }, use) => {
    await use(new BookstoreMainPage(page, baseURL as string));
  },
});

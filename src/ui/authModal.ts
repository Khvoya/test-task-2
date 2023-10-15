import { Locator } from "playwright";

export class AuthModal {
  readonly root: Locator;
  readonly modalContainer: Locator;
  readonly basicAuthContainer: Locator;
  readonly basicUsernameInput: Locator;
  readonly basicPasswordInput: Locator;
  readonly basicAuthorizeButton: Locator;
  readonly logoutButton: Locator;
  readonly closeButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.basicAuthContainer = root.locator(".auth-container").first();
    this.basicUsernameInput = this.basicAuthContainer.locator(
      'input[name="username"]',
    );
    this.basicPasswordInput = this.basicAuthContainer.locator(
      'input[name="password"]',
    );
    this.basicAuthorizeButton = this.basicAuthContainer.getByRole("button", {
      name: "Authorize",
    });
    this.logoutButton = this.basicAuthContainer.getByRole("button", {
      name: "Logout",
    });
    this.closeButton = this.basicAuthContainer.getByRole("button", {
      name: "Close",
    });
  }

  async fillBasicAuthorizeForm(
    username: string,
    password: string,
  ): Promise<void> {
    await this.basicUsernameInput.fill(username);
    await this.basicPasswordInput.fill(password);
  }

  async submitBasicForm(): Promise<void> {
    await this.basicAuthorizeButton.click();
  }

  async closeModal(): Promise<void> {
    await this.closeButton.click();
  }
}

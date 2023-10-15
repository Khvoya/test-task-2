import { Page, Locator } from "playwright";
import { AuthModal } from "./authModal";

export class BookstoreMainPage {
  readonly url: string;
  readonly root: Page;
  readonly authorizeButton: Locator;
  readonly authModal: AuthModal;

  constructor(root: Page, pageUrl: string) {
    this.url = pageUrl;
    this.root = root;
    this.authorizeButton = root.locator(".authorize");
    this.authModal = new AuthModal(root.locator(".modal-ux-inner"));
  }
  async openMainPage(): Promise<void> {
    this.root.goto(this.url, { waitUntil: "load" });
  }
  async openAuthModal(): Promise<void> {
    this.authorizeButton.click();
    this.authModal.root.waitFor({ state: "visible" });
  }
}

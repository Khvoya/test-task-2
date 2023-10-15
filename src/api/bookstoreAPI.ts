import { Page } from "playwright";
import { authResponseType, userResponseType } from "./types";

export class BookstoreAPI {
  readonly page: Page;
  readonly userAccoutEndpoint: string;
  readonly userAuthTokenEndpoint: string;

  constructor(page: Page) {
    this.page = page;
    this.userAccoutEndpoint = "/Account/v1/User";
    this.userAuthTokenEndpoint = "/Account/v1/GenerateToken";
  }

  async createUser(
    userName: string,
    password: string,
  ): Promise<userResponseType> {
    const response = await this.page.request.post(this.userAccoutEndpoint, {
      data: { userName, password },
    });
    return response.json();
  }

  async authorizeUser(
    userName: string,
    password: string,
  ): Promise<authResponseType> {
    const response = await this.page.request.post(this.userAuthTokenEndpoint, {
      data: { userName, password },
    });
    return response.json();
  }

  async getUser(
    userId: string,
  ): Promise<{ json: userResponseType; status: number }> {
    const response = await this.page.request.get(
      `${this.userAccoutEndpoint}/${userId}`,
    );
    return { json: await response.json(), status: response.status() };
  }
}

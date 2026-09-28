import { expect, type Locator, type Page } from '@playwright/test';
import type { Credentials } from '../test-data/users.js';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(credentials: Credentials): Promise<void> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}

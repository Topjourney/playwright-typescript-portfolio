import { type Page } from '@playwright/test';

export class MenuComponent {
  constructor(private readonly page: Page) {}

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }
}

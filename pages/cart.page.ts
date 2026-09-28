import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly title: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  private item(productName: string): Locator {
    return this.page.locator('[data-test="inventory-item"]').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectProduct(productName: string): Promise<void> {
    await expect(this.item(productName)).toBeVisible();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.item(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async expectProductAbsent(productName: string): Promise<void> {
    await expect(this.item(productName)).toHaveCount(0);
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}

import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  private readonly title: Locator;
  private readonly sortSelect: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByTestId('title');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  private item(productName: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: productName });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  async addProduct(productName: string): Promise<void> {
    await this.item(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async expectProductSummary(productName: string): Promise<void> {
    const product = this.item(productName);
    await expect(product.getByTestId('inventory-item-name')).toHaveText(productName);
    await expect(product.getByTestId('inventory-item-desc')).not.toBeEmpty();
    await expect(product.getByTestId('inventory-item-price')).toHaveText(/^\$\d+\.\d{2}$/);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async sortBy(option: 'lohi' | 'hilo' | 'az' | 'za'): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async prices(): Promise<number[]> {
    const labels = await this.page.getByTestId('inventory-item-price').allTextContents();
    return labels.map((label) => Number(label.replace('$', '')));
  }
}

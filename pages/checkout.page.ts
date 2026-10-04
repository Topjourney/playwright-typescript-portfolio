import { expect, type Locator, type Page } from '@playwright/test';
import type { CheckoutCustomer } from '../test-data/customers.js';

export class CheckoutPage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly errorMessage: Locator;
  private readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.errorMessage = page.getByTestId('error');
    this.completeHeader = page.getByTestId('complete-header');
  }

  async submitCustomerInformation(customer?: Partial<CheckoutCustomer>): Promise<void> {
    if (customer?.firstName !== undefined) {
      await this.firstNameInput.fill(customer.firstName);
    }
    if (customer?.lastName !== undefined) {
      await this.lastNameInput.fill(customer.lastName);
    }
    if (customer?.postalCode !== undefined) {
      await this.postalCodeInput.fill(customer.postalCode);
    }
    await this.continueButton.click();
  }

  async expectValidationError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }

  async expectOverviewProduct(productName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.page.getByTestId('inventory-item-name')).toHaveText(productName);
    await expect(this.page.getByTestId('total-label')).toHaveText(/^Total: \$\d+\.\d{2}$/);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }

  async expectComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}

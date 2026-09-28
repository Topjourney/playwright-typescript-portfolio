import { test as base } from '@playwright/test';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { LoginPage } from '../pages/login.page.js';
import { MenuComponent } from '../pages/menu.component.js';
import { users } from '../test-data/users.js';

interface AppFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  menu: MenuComponent;
  authenticatedInventoryPage: InventoryPage;
}

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  menu: async ({ page }, use) => {
    await use(new MenuComponent(page));
  },
  authenticatedInventoryPage: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.goto();
    await loginPage.login(users.standard);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';

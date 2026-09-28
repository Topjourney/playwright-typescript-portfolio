import { test, expect } from '../fixtures/test.js';
import { products } from '../test-data/products.js';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProduct(products.backpack);
    await authenticatedInventoryPage.openCart();
  });

  test('QA-CART-001 | selected product appears in the cart @smoke', async ({ cartPage }) => {
    await cartPage.expectLoaded();
    await cartPage.expectProduct(products.backpack);
  });

  test('QA-CART-002 | cart selection persists after continuing shopping @regression', async ({
    cartPage,
    inventoryPage,
  }) => {
    await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('QA-CART-003 | product can be removed from the cart @regression', async ({ cartPage }) => {
    await cartPage.removeProduct(products.backpack);

    await cartPage.expectProductAbsent(products.backpack);
  });
});

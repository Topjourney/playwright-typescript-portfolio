import { test } from '../fixtures/test.js';
import { products } from '../test-data/products.js';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ authenticatedInventoryPage }) => {
    await authenticatedInventoryPage.addProduct(products.backpack);
    await authenticatedInventoryPage.openCart();
  });

  test(
    'QA-CART-001 | selected product appears in the cart',
    { tag: '@smoke', annotation: { type: 'requirement', description: 'BR-03' } },
    async ({ cartPage }) => {
      await cartPage.expectLoaded();
      await cartPage.expectProduct(products.backpack);
    },
  );

  test(
    'QA-CART-002 | cart selection persists after continuing shopping',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-03' } },
    async ({ cartPage, inventoryPage }) => {
      await cartPage.continueShopping();

      await inventoryPage.expectLoaded();
      await inventoryPage.expectCartCount(1);
    },
  );

  test(
    'QA-CART-003 | product can be removed from the cart',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-03' } },
    async ({ cartPage }) => {
      await cartPage.removeProduct(products.backpack);

      await cartPage.expectProductAbsent(products.backpack);
    },
  );
});

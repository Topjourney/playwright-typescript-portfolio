import { test, expect } from '../fixtures/test.js';
import { products } from '../test-data/products.js';

test.describe('Product catalogue', () => {
  test('QA-INV-001 | products can be sorted by ascending price @regression', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.sortBy('lohi');

    const actualPrices = await authenticatedInventoryPage.prices();
    const expectedPrices = [...actualPrices].sort((first, second) => first - second);
    expect(actualPrices).toEqual(expectedPrices);
  });

  test('QA-INV-002 | product summary shows core information @regression', async ({
    authenticatedInventoryPage,
  }) => {
    await authenticatedInventoryPage.expectProductSummary(products.backpack);
  });
});

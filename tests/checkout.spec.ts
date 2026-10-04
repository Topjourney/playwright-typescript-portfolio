import { test } from '../fixtures/test.js';
import { checkoutCustomer } from '../test-data/customers.js';
import { products } from '../test-data/products.js';

test.describe('Checkout', () => {
  test.beforeEach(async ({ authenticatedInventoryPage, cartPage }) => {
    await authenticatedInventoryPage.addProduct(products.backpack);
    await authenticatedInventoryPage.openCart();
    await cartPage.checkout();
  });

  test(
    'QA-CHK-001 | all customer details are required',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-04' } },
    async ({ checkoutPage }) => {
      await test.step('First name is required', async () => {
        await checkoutPage.submitCustomerInformation();
        await checkoutPage.expectValidationError('First Name is required');
      });

      await test.step('Last name is required', async () => {
        await checkoutPage.submitCustomerInformation({ firstName: checkoutCustomer.firstName });
        await checkoutPage.expectValidationError('Last Name is required');
      });

      await test.step('Postal code is required', async () => {
        await checkoutPage.submitCustomerInformation({ lastName: checkoutCustomer.lastName });
        await checkoutPage.expectValidationError('Postal Code is required');
      });
    },
  );

  test(
    'QA-CHK-002 | customer can complete a purchase',
    {
      tag: ['@smoke', '@e2e'],
      annotation: { type: 'requirement', description: 'BR-04' },
    },
    async ({ checkoutPage }) => {
      await test.step('Enter valid customer information', async () => {
        await checkoutPage.submitCustomerInformation(checkoutCustomer);
      });

      await test.step('Review and finish the order', async () => {
        await checkoutPage.expectOverviewProduct(products.backpack);
        await checkoutPage.finish();
      });

      await test.step('Confirm successful completion', async () => {
        await checkoutPage.expectComplete();
      });
    },
  );
});

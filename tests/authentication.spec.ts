import { test } from '../fixtures/test.js';
import { invalidCredentials, users } from '../test-data/users.js';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test(
    'QA-AUTH-001 | standard user can sign in',
    { tag: '@smoke', annotation: { type: 'requirement', description: 'BR-01' } },
    async ({ loginPage, inventoryPage }) => {
      await test.step('Submit valid credentials', async () => {
        await loginPage.login(users.standard);
      });

      await test.step('Confirm the product catalogue is displayed', async () => {
        await inventoryPage.expectLoaded();
      });
    },
  );

  test(
    'QA-AUTH-002 | invalid credentials show a safe error',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-01' } },
    async ({ loginPage }) => {
      await loginPage.login(invalidCredentials);

      await loginPage.expectError('Username and password do not match');
    },
  );

  test(
    'QA-AUTH-003 | required credentials are validated',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-01' } },
    async ({ loginPage }) => {
      await test.step('Username is required', async () => {
        await loginPage.submit();
        await loginPage.expectError('Username is required');
      });

      await test.step('Password is required after a username is supplied', async () => {
        await loginPage.enterUsername(users.standard.username);
        await loginPage.submit();
        await loginPage.expectError('Password is required');
      });
    },
  );

  test(
    'QA-AUTH-004 | locked-out user cannot sign in',
    { tag: '@regression', annotation: { type: 'requirement', description: 'BR-01' } },
    async ({ loginPage }) => {
      await loginPage.login(users.lockedOut);

      await loginPage.expectError('Sorry, this user has been locked out');
      await loginPage.expectLoaded();
    },
  );
});

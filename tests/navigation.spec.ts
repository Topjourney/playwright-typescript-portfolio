import { test } from '../fixtures/test.js';

test('QA-NAV-001 | signed-in user can log out @regression', async ({
  authenticatedInventoryPage: _authenticatedInventoryPage,
  menu,
  loginPage,
}) => {
  await menu.logout();

  await loginPage.expectLoaded();
});

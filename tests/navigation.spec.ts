import { test } from '../fixtures/test.js';

test(
  'QA-NAV-001 | signed-in user can log out',
  { tag: '@regression', annotation: { type: 'requirement', description: 'BR-05' } },
  async ({ authenticatedInventoryPage: _authenticatedInventoryPage, menu, loginPage }) => {
    await menu.logout();

    await loginPage.expectLoaded();
  },
);

# Interview notes

These notes describe what this repository actually implements. Use them to prepare, then answer naturally rather than memorising the wording.

## 1. Why did you choose Playwright?

Playwright provides one test runner and API for Chromium, Firefox and WebKit, with auto-waiting, web-first assertions, isolated browser contexts, trace capture and an HTML report. Those features let this small project demonstrate reliable E2E execution and useful CI diagnostics without combining several tools.

## 2. Why TypeScript?

TypeScript catches incorrect data shapes and API use before execution. This repository enables strict mode, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`; it also types credentials, checkout data, fixtures and page-object methods. That makes refactoring safer and communicates the intended inputs.

## 3. How is the framework structured?

`tests/` contains business-readable scenarios. `pages/` centralises page behaviour and locators. `fixtures/` creates typed page objects and the reusable authenticated setup. `test-data/` contains typed users, products and checkout data. `scripts/` validates documentation and produces CI summaries. Playwright, TypeScript and GitHub Actions configuration stays at the root or under `.github/`.

## 4. Why did you use Page Object Model?

Login, inventory, cart and checkout actions repeat across scenarios, so centralising them reduces selector duplication and keeps tests focused on outcomes. Locators are private and the objects expose business-level methods such as `addProduct`, `expectCartCount` and `submitCustomerInformation`. The classes stay page-specific rather than becoming a single large abstraction.

## 5. How do fixtures work?

The custom fixture extends Playwright's base test with typed page objects. Playwright supplies a fresh `page` in an isolated browser context for each test. `authenticatedInventoryPage` performs login and confirms the catalogue before handing the ready page object to a scenario. Dependent tests reuse setup without sharing state between tests.

## 6. How do you avoid flaky tests?

Tests use fresh contexts, Playwright locators and web-first assertions rather than timing assumptions. They do not depend on execution order, and there are no hard-coded sleeps. CI captures a trace on the first retry, but the release summary treats flaky results as NOT READY so retries do not hide instability.

## 7. Why should you avoid hard-coded waits?

A fixed wait is either longer than necessary or too short under load. It makes suites slow and still unreliable. Playwright actions auto-wait for elements to become actionable, while assertions such as `toBeVisible` and `toHaveText` retry until the expected state or a meaningful timeout.

## 8. How do Playwright locators improve reliability?

The suite prefers explicit test IDs and accessible roles because they describe stable testing or user-facing contracts. Locators are resolved when used, so Playwright can retry against the current DOM. Page objects also give each locator one maintenance point.

## 9. What happens when a test fails?

The test command returns a non-zero exit code and fails the GitHub Actions job. Playwright retains a screenshot and video on failure and records a trace on the first retry. The HTML report is uploaded as a browser-specific artifact. The generated business summary reports NOT READY when there is an unexpected or flaky result.

## 10. How does your GitHub Actions pipeline work?

Pushes and pull requests to `main` trigger the workflow. A quality job installs dependencies with `npm ci`, then runs type-checking, linting, formatting and documentation-link validation. After it passes, three matrix jobs install only their required browser, run the suite in Chromium, Firefox or WebKit, generate a release summary and upload evidence.

## 11. What happens when you open a pull request?

The same quality gate and three-browser suite run before merge. The pull-request template asks for the business change, BR/QA references, risk, coverage and evidence. In a team repository I would make those checks required through branch protection; this portfolio supplies the workflow but does not claim an organisation policy exists.

## 12. How do you decide which tests belong in smoke versus regression?

Smoke covers the minimum revenue journey: sign in, put an intended product in the cart and complete checkout. A failure means the core service is not usable. Regression covers validation, locked accounts, sorting, product information, cart state/removal and logout. The distinction is based on release impact, not test length.

## 13. How would you scale this framework?

I would first add API/component coverage so most behaviour is tested below the browser. For more UI scenarios I would add page or component objects only where repetition appears, create owned test-data setup and cleanup, and shard or separate CI suites only when execution data justified it. I would avoid a large utility layer without a real use case.

## 14. How would you integrate Jira, TestRail or Xray?

The BR and QA identifiers already provide mapping keys. After the team chose a tool, I would use its supported API or reporter to publish execution status and evidence from CI, with credentials stored as GitHub secrets. I would keep vendor code outside the scenarios and avoid duplicating the tool as the source of truth. This repository demonstrates the mapping but does not claim a commercial integration.

## 15. How would you investigate a test that passes locally but fails in CI?

I would compare the exact commit, browser, Node/dependency versions, base URL, worker count and timing. Then I would inspect the CI trace, screenshot, video and network/console evidence, reproduce with the same browser in headless mode, and distinguish product, test, data and environment causes. I would not simply add a retry or longer timeout.

## 16. How would you prioritise testing across competing programmes?

I would compare customer impact, likelihood, change size, regulatory/security exposure, dependencies and release date with the Test Lead and product owners. P0 shared journeys receive smoke coverage first. I would make coverage gaps and residual risks visible, time-box lower-risk work, and avoid silently treating every request as equal priority.

## 17. What would you improve next?

I would add API tests for faster diagnosis, accessibility checks on the critical journey, and controlled test-data lifecycle in an owned environment. I would add a real test-management reporter only after the team selected its tool and required workflow. Those changes address known limitations rather than increasing the technology count.

## Honest project positioning

> I built this independently to transfer my enterprise automation experience into modern QA automation with TypeScript, Playwright and GitHub Actions. It is hands-on Playwright experience, not commercial Playwright experience.

Be prepared to demonstrate `tests/checkout.spec.ts`, `fixtures/test.ts`, one page object, `playwright.config.ts`, the GitHub Actions workflow and the requirements matrix without relying on these notes.

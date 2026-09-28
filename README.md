# Playwright TypeScript E2E Portfolio

A production-minded browser automation project demonstrating **TypeScript**, **Playwright**, **cross-browser testing** and **GitHub Actions CI** against the public [SauceDemo](https://www.saucedemo.com/) e-commerce test application.

This is intentionally more than a tutorial: the repository uses typed test data, reusable page objects, custom fixtures, positive and negative scenarios, stable test-case IDs, failure diagnostics and a documented risk-based test strategy.

## What this demonstrates

- 12 automated scenarios across authentication, catalogue, cart, checkout and logout
- TypeScript strict mode and compile-time checks
- Page Object Model with dependency-injected Playwright fixtures
- Stable `data-test` and accessible role locators
- `@smoke` and `@regression` execution tags
- Chromium, Firefox and WebKit coverage
- GitHub Actions quality gate and parallel browser matrix
- HTML reports, traces, screenshots and video for failure diagnosis
- Test-case traceability and a practical defect-report template

## Test architecture

```text
tests/        Business-readable scenarios and assertions
fixtures/     Isolated page-object setup and authenticated state
pages/        Reusable UI interactions and page-level assertions
test-data/    Typed users, customers and products
docs/         Test strategy, traceability and defect template
```

Each test runs in a fresh browser context. The authenticated fixture performs setup through the UI, while page objects keep selectors and repeatable actions out of the scenario files.

## Coverage

| Area           | Positive coverage                               | Negative coverage                           |
| -------------- | ----------------------------------------------- | ------------------------------------------- |
| Authentication | Standard-user login                             | Invalid, missing and locked-out credentials |
| Catalogue      | Price sorting, product information, add to cart | —                                           |
| Cart           | Product present, state persistence, removal     | —                                           |
| Checkout       | Completed purchase                              | Required customer information               |
| Navigation     | Logout                                          | —                                           |

See [test case traceability](docs/test-cases.md) and the full [test strategy](docs/test-strategy.md).

## Quick start

Prerequisites: Node.js 24 or newer.

```bash
npm ci
npx playwright install
npm test
```

Run the fast smoke pack in Chromium:

```bash
npm run test:smoke -- --project=chromium
```

Useful commands:

| Command                   | Purpose                                  |
| ------------------------- | ---------------------------------------- |
| `npm test`                | Run all tests in all configured browsers |
| `npm run test:smoke`      | Run critical-path scenarios              |
| `npm run test:regression` | Run broader regression scenarios         |
| `npm run test:headed`     | Watch tests in desktop Chromium          |
| `npm run test:ui`         | Open Playwright's interactive UI mode    |
| `npm run test:debug`      | Step through tests with the Inspector    |
| `npm run check`           | Type-check, lint and verify formatting   |
| `npm run report`          | Serve the most recent HTML report        |

The target can be changed without editing source code:

```bash
BASE_URL=https://your-test-environment.example npm test
```

## Continuous integration

The workflow runs on every push and pull request to `main`:

1. Type-checks, lints and verifies formatting.
2. Runs the complete suite in separate Chromium, Firefox and WebKit jobs.
3. Uploads a browser-specific HTML report for 14 days, even when a test fails.

Playwright captures a trace on the first retry and retains screenshots and video on failure. This makes CI failures reproducible rather than leaving only a red status.

## Test management and teamwork

Scenario titles carry stable IDs such as `QA-CHK-002`, ready to map to Jira/Xray, Zephyr or TestRail. The repository also includes:

- [Risk-based test strategy](docs/test-strategy.md)
- [Test case traceability matrix](docs/test-cases.md)
- [Defect report template](docs/defect-template.md)
- [Role-focused interview guide](docs/interview-guide.md)
- [Contribution and review workflow](CONTRIBUTING.md)

## Intentional limitations

This is a focused portfolio suite against a third-party public demo. A real product strategy would add lower-level API/component tests, owned test data, environment health checks and appropriate non-functional coverage. Public demo credentials are used here; real credentials belong in encrypted CI secrets and must never be committed.

## Interview discussion points

- Why critical customer journeys are tagged separately from the regression pack
- How isolated contexts and web-first assertions reduce flaky tests
- Why a UI-heavy suite should be balanced with faster API and unit coverage
- How traces and artifacts support defect triage
- How the test-case IDs connect automation to test management
- Which risks would change first when moving from a demo site to a production team

## CV-ready description

**Web Test Automation Project — TypeScript, Playwright & GitHub Actions**  
Built a cross-browser end-to-end automation suite in TypeScript using Playwright, covering critical e-commerce journeys and negative test cases; implemented reusable page objects, traceable test cases, failure diagnostics and automated execution through GitHub Actions CI.

## Disclaimer

SauceDemo and Sauce Labs are used only as a public testing target. This project is not affiliated with or endorsed by Sauce Labs.

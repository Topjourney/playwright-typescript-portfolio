# Trail & Tide Outfitters — Quality Engineering Solution

[![Playwright tests](https://github.com/Topjourney/playwright-typescript-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/Topjourney/playwright-typescript-portfolio/actions/workflows/playwright.yml)

A self-directed, business-led quality engineering project by **Yuhan Deng**, built with TypeScript, Playwright and GitHub Actions against the public [SauceDemo](https://www.saucedemo.com/) e-commerce test application.

## Business challenge

**Trail & Tide Outfitters** is a fictional outdoor retailer moving from monthly storefront releases to several releases each week. Login, cart or checkout defects can prevent customers from purchasing, while repeated manual regression across browsers slows delivery and produces inconsistent evidence.

I designed and implemented a practical solution: an automated release gate protecting the customer journey from access through purchase confirmation.

> **Project integrity:** Trail & Tide is a fictional case study and SauceDemo is the public sandbox. This is an independently executed personal project, not commercial client work.

## Solution and measurable outcomes

| Business need                     | Implemented solution                                     | Evidence                               |
| --------------------------------- | -------------------------------------------------------- | -------------------------------------- |
| Protect revenue-critical journeys | P0 smoke coverage for login, cart and completed checkout | 3 critical scenarios                   |
| Broaden release confidence        | Positive and negative regression coverage                | 12 traceable scenarios                 |
| Reduce browser risk               | Parallel Chromium, Firefox and WebKit validation         | 36 browser executions                  |
| Make release decisions explicit   | Generated READY / NOT READY summary                      | Zero-failure, zero-flaky gate          |
| Speed up triage                   | HTML report, trace, screenshot and video                 | CI artifacts retained for 14 days      |
| Connect testing to business risk  | BR and QA identifiers with priority                      | Requirements traceability matrix       |
| Support team delivery             | Pull-request and defect templates                        | Consistent evidence and risk decisions |

The complete local validation baseline is **36/36 passing browser tests**. The illustrative business model estimates that automating a 45-minute manual pack across three browsers, three times per week, could return approximately six hours each week for exploratory and higher-value testing. The assumptions are documented rather than presented as measured client savings.

Read the full [business case and delivery plan](docs/business-case.md).

## Quality-engineering design

```text
Business requirements (BR IDs)
            ↓
Risk-based test cases (QA IDs + smoke/regression tags)
            ↓
Typed fixtures and page objects
            ↓
Chromium / Firefox / WebKit in GitHub Actions
            ↓
Release decision + diagnostic evidence
```

The repository demonstrates:

- Strict TypeScript and compile-time checks
- Page Object Model with dependency-injected Playwright fixtures
- Stable `data-test` and accessible-role locators
- Isolated browser context for every scenario
- Positive and negative customer journeys
- `@smoke` and `@regression` execution packs
- GitHub Actions quality gate and browser matrix
- Automated release-readiness summaries
- HTML reports, traces, screenshots and video
- Business-to-test traceability and test-management readiness

## Repository structure

```text
tests/        Business-readable scenarios and assertions
fixtures/     Isolated page-object setup and authenticated state
pages/        Reusable UI interactions and page-level assertions
test-data/    Typed users, customers and products
scripts/      CI release-summary generation
docs/         Business case, strategy, traceability and interview guide
.github/      CI workflow, defect form and pull-request controls
```

## Coverage

| Business area     | Positive coverage                              | Negative coverage                           |
| ----------------- | ---------------------------------------------- | ------------------------------------------- |
| Customer access   | Standard-user login                            | Invalid, missing and locked-out credentials |
| Product discovery | Price sorting and product information          | —                                           |
| Cart integrity    | Product present, state persistence and removal | —                                           |
| Purchase          | Completed checkout                             | Required customer information               |
| Session control   | Logout                                         | —                                           |

Every automated scenario maps to a business requirement in the [requirements traceability matrix](docs/requirements-traceability.md) and to a detailed [test case](docs/test-cases.md).

## Quick start

Prerequisite: Node.js 24 or newer.

```bash
npm ci
npx playwright install
npm test
```

Run the fast critical-path pack in Chromium:

```bash
npm run test:smoke -- --project=chromium
```

Useful commands:

| Command                       | Purpose                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `npm test`                    | Run all tests in all configured browsers                    |
| `npm run test:smoke`          | Run the revenue-critical release pack                       |
| `npm run test:regression`     | Run broader positive and negative coverage                  |
| `npm run test:headed`         | Watch tests in desktop Chromium                             |
| `npm run test:ui`             | Explore tests in Playwright UI mode                         |
| `npm run test:debug`          | Step through tests with the Inspector                       |
| `npm run check`               | Type-check, lint and verify formatting                      |
| `npm run summary -- chromium` | Generate a release-readiness summary from the latest result |
| `npm run report`              | Serve the most recent HTML report                           |

The target environment can be changed without editing source code:

```bash
BASE_URL=https://your-test-environment.example npm test
```

## Continuous delivery controls

Every push and pull request to `main`:

1. Type-checks, lints and verifies formatting.
2. Runs the full suite in separate Chromium, Firefox and WebKit jobs.
3. Generates an explicit business release decision for each browser.
4. Uploads the HTML report and Markdown release summary for 14 days.

A run is **READY** only when at least one test executed, with zero unexpected failures and zero flaky scenarios. A P0 failure blocks release under the documented [release policy](docs/business-case.md#release-policy).

## Delivery documentation

- [Business case, stakeholders, value model and rollout](docs/business-case.md)
- [Business requirements traceability](docs/requirements-traceability.md)
- [Risk-based test strategy](docs/test-strategy.md)
- [Detailed test cases](docs/test-cases.md)
- [Defect communication template](docs/defect-template.md)
- [Role-focused interview guide](docs/interview-guide.md)
- [Contribution and review workflow](CONTRIBUTING.md)

GitHub also provides a structured defect form and pull-request template so impact, coverage and release risk are discussed consistently.

## Intentional limitations and roadmap

This portfolio focuses on browser-level validation against a third-party sandbox. A production implementation would add faster API/component coverage, controlled test accounts and data cleanup, environment health checks, accessibility validation and selective performance/security testing based on risk. Public demo credentials are used here; real credentials belong in encrypted CI secrets and must never be committed.

## CV-ready description

**Quality Engineering Project — TypeScript, Playwright & GitHub Actions**

Designed and delivered a risk-based, cross-browser quality gate for a fictional e-commerce business, automating 12 critical and negative customer scenarios in TypeScript/Playwright; connected requirements to test evidence, implemented reusable fixtures and page objects, and generated release-readiness reporting through GitHub Actions CI.

## Disclaimer

Trail & Tide Outfitters is fictional. SauceDemo and Sauce Labs are used only as a public testing target; this project is not affiliated with or endorsed by Sauce Labs.

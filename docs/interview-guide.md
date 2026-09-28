# Interview guide

Use this as a speaking guide, not a script to memorise. Be ready to open the relevant files and explain decisions in your own words.

## 90-second project summary

> I created a fictional outdoor retail business case, Trail & Tide Outfitters, and designed a quality-engineering solution for its move to frequent storefront releases. Using SauceDemo as the public sandbox, I automated 12 risk-based scenarios covering customer access, product discovery, cart integrity, checkout and session control. I connected business requirements to stable test IDs, separated typed data, fixtures and page objects, and added a GitHub Actions release gate across Chromium, Firefox and WebKit. Each job produces a READY or NOT READY decision plus diagnostic artifacts, turning the suite into practical release evidence rather than just a collection of tests.

## Role requirement mapping

| La Fosse requirement             | Evidence in this project                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| TypeScript with Playwright       | Strict TypeScript config, typed data, Playwright fixtures, page objects and 12 scenarios |
| CI/CD; GitHub Actions beneficial | Quality-gate job plus parallel Chromium, Firefox and WebKit jobs                         |
| Attention to detail              | Negative tests, precise assertions, formatting/lint/type checks, failure artifacts       |
| Written communication            | README, risk-based strategy, traceability matrix and defect template                     |
| Team collaboration               | Contribution workflow, pull-request quality gate and reusable conventions                |
| Test management tools            | Stable IDs designed to map to Jira/Xray, Zephyr or TestRail                              |
| Business and service thinking    | Stakeholders, requirements, value assumptions, release policy and phased roadmap         |

## Three-minute live demo

1. Open `docs/business-case.md` and explain the problem, stakeholders and release policy.
2. Open `tests/checkout.spec.ts` to show readable steps and positive/negative coverage.
3. Open `fixtures/test.ts` and one page object to explain reuse and isolated setup.
4. Open `.github/workflows/playwright.yml` to show the quality gate, browser matrix and generated release summary.
5. Open `docs/requirements-traceability.md` to connect commercial risk to executable evidence.
6. Run:

   ```bash
   npm run test:smoke -- --project=chromium
   ```

7. If asked about diagnostics, explain `trace: 'on-first-retry'`, screenshots/video on failure and the HTML report.

## Questions to expect

### Why use page objects?

They give selectors and repeatable page interactions one home, keeping scenarios focused on behaviour. I would avoid a single oversized page object and split components as the product grows.

### How did you reduce flakiness?

Each test uses a fresh browser context, web-first assertions wait for observable state, stable test IDs or accessible roles are preferred, and no test depends on another test's order or data. Retries collect diagnostics in CI; they are not a substitute for fixing flaky tests.

### Why only end-to-end tests?

This repository is intentionally a small browser-automation portfolio. In a real product I would keep fewer end-to-end tests for critical journeys and add a larger base of fast unit, component and API tests.

### How would this work with a test management tool?

The stable IDs in scenario names map to cases in Jira/Xray, Zephyr or TestRail. A production integration could publish results through the selected tool's API, while keeping vendor-specific code outside the scenarios.

### Why run three browsers?

The role calls for browser automation, and the matrix proves the same behaviour in Chromium, Firefox and WebKit. During development I use one browser for speed, then use CI for broad coverage.

### What would you add next?

API tests for faster service-layer feedback, owned test accounts and data cleanup, environment health checks, accessibility checks and selective visual or performance coverage based on product risk.

## Honest positioning

Say:

> I have hands-on Playwright experience through an independently built automation project, alongside my Barclays automation experience.

Do not call it commercial Playwright experience. The stronger answer is to be precise about what you built, demonstrate it live and connect your existing commercial automation judgement to this modern toolchain.

# Test strategy

## Purpose

This suite provides fast feedback on SauceDemo's highest-value customer journeys: authentication, product discovery, cart management, checkout and session navigation. It is a portfolio project against a public demonstration system, not a claim of commercial ownership or production coverage.

## Scope and priorities

| Priority | Coverage                                                           | Reason                                       |
| -------- | ------------------------------------------------------------------ | -------------------------------------------- |
| P0       | Login, add to cart, complete checkout                              | Revenue path and basic access must work      |
| P1       | Login failures, cart removal/persistence, required checkout fields | Important user recovery and validation paths |
| P2       | Sorting, product information, logout                               | Supporting usability and session journeys    |

Tests marked `@smoke` cover P0 behaviour and are designed for rapid deployment feedback. Tests marked `@regression` provide broader validation before release.

## Test levels

This repository focuses on browser-level end-to-end tests. In a production system, the automation pyramid should also contain many faster unit and API/component tests. Browser tests should be reserved for integration points and critical user journeys.

## Browser coverage

GitHub Actions executes the suite against Chromium, Firefox and WebKit. Local development can target one browser for speed:

```bash
npx playwright test --project=chromium
```

## Reliability controls

- Each test receives an isolated browser context and starts from known state.
- Role-based and test-id locators are preferred over styling selectors.
- Web-first assertions wait for the expected UI state.
- Test data and page interactions are separated from assertions and scenarios.
- CI uses two workers to avoid placing unnecessary load on the public demo service.
- CI retries twice and captures a trace on the first retry; screenshots and video are retained on failure.

Retries make diagnostics available but do not redefine a flaky test as healthy. Repeatedly flaky tests should be quarantined only with an owner, evidence and a time-boxed remediation task.

## Entry and exit criteria

Entry criteria:

- Target environment is reachable.
- Test account advertised by SauceDemo is available.
- Supported browsers have installed successfully.

Exit criteria:

- Static quality checks pass.
- All P0 smoke tests pass in all three browsers.
- No unexplained regression failures remain.
- Failure artifacts have been reviewed before any retry-related pass is accepted.

## Risks and limitations

- The target is a third-party public demo, so availability and content are outside this repository's control.
- UI-only tests cannot isolate service-layer failures as precisely as API tests.
- Test credentials are intentionally public demo credentials; real credentials must be stored as GitHub Actions secrets and must never be committed.
- Accessibility, performance, visual regression and API contract testing are useful future layers but are outside this small project's current scope.

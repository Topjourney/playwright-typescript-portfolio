# Business case: Trail & Tide Outfitters

## Personal-project statement

Trail & Tide Outfitters is a **fictional outdoor retail business** created for this self-directed portfolio project. SauceDemo is used as the public test environment because its login, catalogue, cart and checkout journeys represent the same core risks. This work demonstrates how I would turn a business problem into a practical quality-engineering solution; it is not presented as paid client work.

## Business situation

Trail & Tide is moving from monthly releases to several storefront releases per week. Product teams want to improve conversion quickly, but the current critical-path regression is assumed to be manual and repeated across three browsers. That creates three problems:

1. Slow feedback makes small releases harder to approve.
2. Login, cart or checkout defects can directly block revenue.
3. Test evidence is inconsistent, making release decisions and defect triage harder.

## Proposed solution

Build a maintainable Playwright quality gate around the highest-value customer journey:

```text
Customer access → product discovery → cart → checkout → confirmation
```

The solution combines executable tests with delivery controls:

- A fast `@smoke` pack for critical release feedback.
- Broader `@regression` coverage for validation before release.
- Chromium, Firefox and WebKit execution through GitHub Actions.
- Typed page objects and fixtures for maintainability.
- Stable test IDs mapped to business requirements.
- HTML reports, traces, screenshots and videos for triage.
- A generated release-readiness summary in every browser job.
- Pull-request and defect templates for consistent team communication.

## Stakeholders and outcomes

| Stakeholder      | Need                                           | Solution outcome                                           |
| ---------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| Product manager  | Release quickly without risking core journeys  | Clear READY / NOT READY gate against prioritised behaviour |
| Engineering team | Reproduce failures and understand impact       | Trace, screenshot, video and business requirement ID       |
| Test lead        | Coordinate coverage and priorities             | Smoke/regression packs plus traceability matrix            |
| Customer support | Describe customer-facing problems consistently | Structured defect template with impact and evidence        |
| Commercial lead  | Protect conversion and completed orders        | P0 coverage for login, cart and checkout completion        |

## Business requirements

| ID    | Requirement                                                                                 | Priority | Release consequence                                   |
| ----- | ------------------------------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| BR-01 | Eligible customers can access the storefront; invalid or locked accounts are handled safely | P0/P1    | Access defects can block all purchasing               |
| BR-02 | Customers can view accurate product information and useful catalogue ordering               | P2       | Discovery friction can reduce conversion              |
| BR-03 | Customers can add, retain and remove intended cart items                                    | P0/P1    | Cart errors can cause abandonment or incorrect orders |
| BR-04 | Checkout validates customer data and confirms a valid purchase                              | P0/P1    | Checkout defects directly block revenue               |
| BR-05 | Customers can end their authenticated session                                               | P2       | Session-control defects create privacy and trust risk |

Detailed mapping is maintained in the [requirements traceability matrix](requirements-traceability.md).

## Success measures

| Measure                     | Target                                                  | Current evidence                         |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------- |
| Critical journey automation | Login, cart and completed checkout covered              | 3 P0 smoke scenarios                     |
| Browser confidence          | Current desktop engines represented                     | Chromium, Firefox and WebKit             |
| Release gate                | Zero unexpected failures and zero flaky tests           | Enforced in generated CI summary         |
| Maintainability             | Shared interactions are not duplicated across scenarios | Page objects and custom fixtures         |
| Traceability                | Every automated scenario maps to a requirement          | 12/12 scenarios mapped                   |
| Diagnostic evidence         | Actionable artifacts available after failure            | HTML report, trace, screenshot and video |

## Illustrative value model

This model is an explicit business-case assumption, not a measured client saving:

- Manual regression assumption: 45 minutes per browser × 3 browsers = 2.25 hours per cycle.
- Three release candidates per week = 6.75 hours of repeated checking.
- Automated target: under 10 minutes elapsed in parallel CI, with unattended execution.
- Potential capacity returned: approximately 6 hours per week, redirected to exploratory, accessibility and integration testing.

Automation does not remove human testing. It moves repetitive confirmation into CI so a tester can spend more time investigating new risks and customer experience.

## Delivery plan

| Phase                   | Delivery                                             | Exit criterion                             |
| ----------------------- | ---------------------------------------------------- | ------------------------------------------ |
| 1. Protect revenue path | Authentication, cart and checkout smoke tests        | P0 journeys green in Chromium              |
| 2. Broaden confidence   | Negative paths and cross-browser matrix              | Complete regression green in all browsers  |
| 3. Operationalise       | Release summary, artifacts and contribution controls | Evidence available on every pull request   |
| 4. Scale responsibly    | API, accessibility and owned test-data layers        | Agreed with product risk and team capacity |

## Release policy

A build is **READY** only when:

- Static quality checks pass.
- All smoke and regression scenarios complete.
- Unexpected failures equal zero.
- Flaky scenarios equal zero.
- Evidence is retained for review.

Any P0 failure blocks release. A lower-priority failure requires an explicit, documented risk decision from the relevant product and engineering owners.

## Constraints and next decisions

- SauceDemo is a third-party sandbox, so its availability and data are not controlled by this project.
- UI tests should be complemented by faster API/component coverage in a production system.
- The illustrative time-saving model needs real team baseline data before being treated as an ROI commitment.
- Accessibility, performance, security and visual regression need separate risk assessment rather than being added indiscriminately.

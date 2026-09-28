# Contributing

## Workflow

1. Create a short-lived branch from `main`.
2. Keep each change focused and add or update BR/QA traceability where behaviour changes.
3. Run `npm run check` and the relevant Playwright project locally.
4. Open a pull request explaining the risk, coverage and evidence.
5. Require passing CI and review before merge.

## Test conventions

- Link each scenario to a business requirement, give it a stable `QA-AREA-NNN` identifier and apply an `@smoke` or `@regression` tag.
- Assert user-observable outcomes, not implementation details.
- Prefer accessible roles, labels and explicit test IDs over CSS structure.
- Put reusable interaction logic in page objects and business data in `test-data`.
- Keep tests independent; do not rely on execution order or state left by another test.
- Do not commit secrets, reports, videos, screenshots or traces.

## Before submitting

```bash
npm run check
npx playwright test --project=chromium
```

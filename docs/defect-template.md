# Defect report template

> This is a reusable template showing how automation evidence would be communicated. It is not a claim that a defect was found in SauceDemo.

## `[Short, observable problem statement]`

**Reference:** BUG-000  
**Environment:** Browser / operating system / build or commit  
**Severity:** Critical / High / Medium / Low  
**Priority:** P0 / P1 / P2 / P3  
**Related test:** QA-AREA-000

### Preconditions

1. State the account or data state.
2. State the page or feature required.

### Steps to reproduce

1. Use exact, minimal actions.
2. Include the relevant input data.
3. End on the action that exposes the problem.

### Expected result

Describe the observable requirement.

### Actual result

Describe what happened without guessing at the underlying cause.

### Evidence

- Playwright trace: attach CI artifact link
- Screenshot/video: attach CI artifact link
- Console or network error: include only relevant, non-sensitive detail

### Impact and notes

Explain customer or business impact, frequency, reproducibility and any safe workaround.

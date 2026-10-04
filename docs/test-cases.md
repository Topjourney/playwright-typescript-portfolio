# Requirements-to-test traceability

This lightweight test-management matrix connects business risk to executable evidence. The stable BR and QA identifiers could be represented in Jira/Xray, Zephyr or TestRail without coupling this portfolio to a tool it does not use.

| Requirement | Test ID     | Priority | Type                | Pack        | Scenario                              | Expected result                                        | Automated file                 |
| ----------- | ----------- | -------- | ------------------- | ----------- | ------------------------------------- | ------------------------------------------------------ | ------------------------------ |
| BR-01       | QA-AUTH-001 | P0       | Positive            | Smoke       | Sign in as the standard user          | Product catalogue opens                                | `tests/authentication.spec.ts` |
| BR-01       | QA-AUTH-002 | P1       | Negative            | Regression  | Sign in with invalid credentials      | Safe authentication error is shown                     | `tests/authentication.spec.ts` |
| BR-01       | QA-AUTH-003 | P1       | Negative / boundary | Regression  | Submit each required credential state | Username and password errors are shown                 | `tests/authentication.spec.ts` |
| BR-01       | QA-AUTH-004 | P1       | Negative            | Regression  | Sign in as a locked-out user          | Access is refused with a clear reason                  | `tests/authentication.spec.ts` |
| BR-02       | QA-INV-001  | P2       | Positive            | Regression  | Sort products low to high             | A non-empty price list is in ascending order           | `tests/inventory.spec.ts`      |
| BR-02       | QA-INV-002  | P2       | Positive            | Regression  | View a catalogue product              | Name, description and valid price are shown            | `tests/inventory.spec.ts`      |
| BR-03       | QA-CART-001 | P0       | Positive            | Smoke       | Open cart after adding a product      | Selected product is present                            | `tests/cart.spec.ts`           |
| BR-03       | QA-CART-002 | P1       | State               | Regression  | Continue shopping from the cart       | Selection remains in the cart                          | `tests/cart.spec.ts`           |
| BR-03       | QA-CART-003 | P1       | Positive            | Regression  | Remove a cart product                 | Product disappears from the cart                       | `tests/cart.spec.ts`           |
| BR-04       | QA-CHK-001  | P1       | Negative / boundary | Regression  | Submit each missing checkout field    | First name, last name and postal-code errors are shown | `tests/checkout.spec.ts`       |
| BR-04       | QA-CHK-002  | P0       | End-to-end          | Smoke / E2E | Complete checkout with valid details  | Order confirmation is shown                            | `tests/checkout.spec.ts`       |
| BR-05       | QA-NAV-001  | P2       | Positive            | Regression  | Log out                               | Login page is shown                                    | `tests/navigation.spec.ts`     |

## Coverage decision

The smoke pack protects the minimum revenue path: access, cart and completed purchase. Supporting negative, boundary, state and usability behaviours sit in regression. `QA-CHK-002` is also tagged `@e2e` because it crosses authentication, catalogue, cart, customer information, order review and confirmation.

This is deliberately selective coverage, not a claim that every possible storefront behaviour is automated.

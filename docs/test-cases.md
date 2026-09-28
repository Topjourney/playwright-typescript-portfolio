# Test case traceability

| ID          | Priority | Type     | Scenario                               | Expected result                       | Automated file                 |
| ----------- | -------- | -------- | -------------------------------------- | ------------------------------------- | ------------------------------ |
| QA-AUTH-001 | P0       | Positive | Sign in as the standard user           | Product catalogue opens               | `tests/authentication.spec.ts` |
| QA-AUTH-002 | P1       | Negative | Sign in with invalid credentials       | Safe authentication error is shown    | `tests/authentication.spec.ts` |
| QA-AUTH-003 | P1       | Negative | Submit missing credentials             | Required-field messages are shown     | `tests/authentication.spec.ts` |
| QA-AUTH-004 | P1       | Negative | Sign in as a locked-out user           | Access is refused with a clear reason | `tests/authentication.spec.ts` |
| QA-INV-001  | P2       | Positive | Sort products low to high              | Prices are in ascending order         | `tests/inventory.spec.ts`      |
| QA-INV-002  | P2       | Positive | View a catalogue product               | Name, description and price are shown | `tests/inventory.spec.ts`      |
| QA-CART-001 | P0       | Positive | Open cart after adding a product       | Selected product is present           | `tests/cart.spec.ts`           |
| QA-CART-002 | P1       | Positive | Continue shopping from the cart        | Selection remains in the cart         | `tests/cart.spec.ts`           |
| QA-CART-003 | P1       | Positive | Remove a cart product                  | Product disappears from the cart      | `tests/cart.spec.ts`           |
| QA-CHK-001  | P1       | Negative | Continue with missing customer details | Required-field error is shown         | `tests/checkout.spec.ts`       |
| QA-CHK-002  | P0       | Positive | Complete checkout with valid details   | Order confirmation is shown           | `tests/checkout.spec.ts`       |
| QA-NAV-001  | P2       | Positive | Log out                                | Login page is shown                   | `tests/navigation.spec.ts`     |

The stable IDs make scenarios easy to map into tools such as Jira, Xray, Zephyr or TestRail without coupling the executable tests to one vendor.

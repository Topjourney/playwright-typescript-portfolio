# Business requirements traceability

This matrix links commercial risk to executable evidence. Stable identifiers allow the same relationships to be represented in Jira/Xray, Zephyr or TestRail.

| Requirement | Business outcome                                  | Automated evidence | Pack       |
| ----------- | ------------------------------------------------- | ------------------ | ---------- |
| BR-01       | Eligible customers can access the storefront      | QA-AUTH-001        | Smoke      |
| BR-01       | Invalid credentials receive a safe response       | QA-AUTH-002        | Regression |
| BR-01       | Required credentials are validated                | QA-AUTH-003        | Regression |
| BR-01       | Locked accounts cannot sign in                    | QA-AUTH-004        | Regression |
| BR-02       | Customers can sort products by price              | QA-INV-001         | Regression |
| BR-02       | Product name, description and price are available | QA-INV-002         | Regression |
| BR-03       | A selected item appears in the cart               | QA-CART-001        | Smoke      |
| BR-03       | Cart state persists while shopping continues      | QA-CART-002        | Regression |
| BR-03       | A customer can remove an unwanted item            | QA-CART-003        | Regression |
| BR-04       | Missing checkout data is rejected clearly         | QA-CHK-001         | Regression |
| BR-04       | A valid customer can complete an order            | QA-CHK-002         | Smoke      |
| BR-05       | An authenticated customer can log out             | QA-NAV-001         | Regression |

## Coverage decision

The smoke pack protects the minimum revenue path: access, cart and completed purchase. Supporting negative and usability behaviours sit in regression. This is a deliberate risk decision, not a claim that every possible storefront behaviour is covered.

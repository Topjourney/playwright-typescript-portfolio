export interface CheckoutCustomer {
  readonly firstName: string;
  readonly lastName: string;
  readonly postalCode: string;
}

export const checkoutCustomer: CheckoutCustomer = {
  firstName: 'Alex',
  lastName: 'Tester',
  postalCode: 'SW1A 1AA',
};

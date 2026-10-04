export interface Credentials {
  readonly username: string;
  readonly password: string;
}

type UserRole = 'standard' | 'lockedOut';

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const satisfies Record<UserRole, Credentials>;

export const invalidCredentials: Credentials = {
  username: 'invalid_user',
  password: 'incorrect_password',
};

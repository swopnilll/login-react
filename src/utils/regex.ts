/**
 * Regex to validate user.
 */
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

/**
 * Regex to validate password.
 */
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
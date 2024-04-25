export const MESSAGE = {
  404: 'Not Found',
  401: 'Permission Denied',
  500: 'Internal Server Error',
  200: 'Success',
  400: 'Bad Request',
  406: 'Not Acceptable',
  201: 'Created',
  422: 'Invalid',
  502: 'Bad Gateway',
};

export const ERROR_CODES = {
  BAD_REQUEST: 'code/bad-request',
  OTP_EXPIRED: 'auth/otp-expired',
  AUTH_TOKEN_EXPIRED: 'auth/token-expired',
  USER_DISABLED: 'auth/user-disabled',
  UNVERIFIED: 'auth/not-verified',
  UNAUTHORIZED: 'auth/unauthorized',
  FORBIDDEN: 'auth/forbidden',
  AUTH_USER_NOT_FOUND: 'auth/user-not-found',
  MISSING_PARAMS: 'code/missing-params',
  NOT_ACCEPTABLE: 'code/not-acceptable',
  SERVER_ERROR: 'code/internal-server-error',
  DATA_NOT_FOUND: 'db/data-not-found',
  INVALID: 'code/invalid',
  WORNG: 'code/wrong-coupon-code',
  UNPROCESSABLE: 'auth/Unprocessable',
  AUTH_TOKEN_UNAVAILABLE: 'code/token-unavailable',
  PG_ERROR: 'pg/payment-gateway-error',
  PG_INVALID_PAYMENT: 'pg/invalid-payment-info',
  INVALID_ARGUMENT: 'code/invalid-argument',
  UNKNOWN_ERROR: 'code/unknown-error',
};

export const ERROR_SEVERITY = {
  FATAL: 'FATAL',
  ERROR: 'ERROR',
  WARN: 'WARN',
  SUCCESS: 'SUCCESS',
};

export const EMAIL_REGEX = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$';
export const PHONE_REGEX = '^(?:\\+\\d{2}-?)?\\d{10}$';
export const FULLNAME_REGEX = '^[A-Za-z _|]{1,30}$'; // '^[a-zA-Z]+(?:_[a-zA-Z]+)*(?: [a-zA-Z]+(?:_[a-zA-Z]+)*){0,1}$',
export const LANGUAGE_REGEX = '^[A-Za-z ]{1,15}$';

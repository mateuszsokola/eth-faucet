export class NonceExpiredError extends Error {
  code = 401
  message = "Your nonce has expired. Try again."
}

export class SignatureMismatchError extends Error {
  code = 401
  message = "The message has not been signed by your wallet"
}

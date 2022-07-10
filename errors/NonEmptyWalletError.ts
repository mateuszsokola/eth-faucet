export class NonEmptyWalletError extends Error {
  code = 403
  message = "Your wallet has enough Görli ETH."
}

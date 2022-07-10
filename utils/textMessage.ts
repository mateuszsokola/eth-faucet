export const messageTemplate = (nonce: string = "") =>
  `Please sign this message to confirm you own this wallet.\n\n\nNonce: ${nonce}`

export const extractNonceFromMessage = (message: string) => {
  const truncate = messageTemplate()
  const nonce = message.replace(truncate, "")

  return nonce.trim()
}

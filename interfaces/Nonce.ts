export interface NonceResponseBody {
  nonce: string
}

export interface Nonce {
  generate: () => Promise<string>
  verify: (nonce: string) => Promise<boolean>
}

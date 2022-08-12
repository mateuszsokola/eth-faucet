export interface Blockchain {
  fundWallet: (address: string) => Promise<void>
  verifyMessage: (address: string, message: string, signature: string) => Promise<boolean>
  isEligible: (address: string) => Promise<void>
}

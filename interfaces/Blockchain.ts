export interface Blockchain {
  fundWallet: (address: string) => Promise<void>
  verifyMessage: (address: string, message: string, signature: string) => Promise<boolean>
  verifyReceiver: (address: string) => Promise<void>
}

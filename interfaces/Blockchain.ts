export interface Blockchain {
  fundWallet: (address: string, amount: BigInt) => Promise<void>
  verifyMessage: (address: string, message: string, signature: string) => Promise<boolean>
  verifyReceiver: (address: string) => Promise<void>
}

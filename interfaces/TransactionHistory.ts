export interface TransactionHistory {
  hasReceivedTokens: (address: string, blockSpan?: number) => Promise<boolean>
}

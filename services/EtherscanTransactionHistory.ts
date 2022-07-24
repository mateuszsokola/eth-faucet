import { ethers } from "ethers"
import { defaultBlockLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"

export class EtherscanTransactionHistory implements TransactionHistory {
  constructor(private readonly provider: ethers.providers.EtherscanProvider) {}

  async hasReceivedTokens(address: string, blockSpan: number = defaultBlockLayover): Promise<boolean> {
    const endBlock = await this.provider.getBlockNumber()
    const startBlock = endBlock - blockSpan

    const transactions = await this.provider.getHistory(address, startBlock, endBlock)

    for (const transaction of transactions) {
      if (transaction.from.toLocaleLowerCase() === process.env.WALLET_ADDRESS?.toLocaleLowerCase()) {
        return true
      }
    }

    return false
  }

  async recordTransaction(_: string) {
    // do nothing
  }
}

import { Goerli } from "@usedapp/core"
import { ethers } from "ethers"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { EtherscanTransactionHistory } from "../services/EtherscanTransactionHistory"

export const bootstrapTransactionHistory = (chainId: number = Goerli.chainId): TransactionHistory | undefined => {
  switch (process.env.ENABLE_TRANSACTION_CHECKS) {
    case "etherscan": {
      const etherscan = new ethers.providers.EtherscanProvider(chainId, process.env.ETHERSCAN_API_KEY)
      const etherscanService = new EtherscanTransactionHistory(etherscan)

      return etherscanService
    }
    default: {
      return undefined
    }
  }
}

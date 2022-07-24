import { Goerli } from "@usedapp/core"
import { ethers } from "ethers"
import Redis from "ioredis"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { EtherscanTransactionHistory } from "../services/EtherscanTransactionHistory"
import { RedisTransactionHistory } from "../services/RedisTransactionHistory"

export const bootstrapTransactionHistory = (chainId: number = Goerli.chainId): TransactionHistory | undefined => {
  switch (process.env.ENABLE_TRANSACTION_CHECKS) {
    case "etherscan": {
      const etherscan = new ethers.providers.EtherscanProvider(chainId, process.env.ETHERSCAN_API_KEY)
      const etherscanService = new EtherscanTransactionHistory(etherscan)

      return etherscanService
    }
    case "redis": {
      const redis = new Redis(process.env.REDIS_URL as string)
      const redisService = new RedisTransactionHistory(redis)

      return redisService
    }
    default: {
      return undefined
    }
  }
}

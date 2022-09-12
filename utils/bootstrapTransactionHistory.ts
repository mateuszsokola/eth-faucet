import { ethers } from "ethers"
import Redis from "ioredis"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { EtherscanTransactionHistory } from "../services/EtherscanTransactionHistory"
import { IpTransactionHistory } from "../services/IpTransactionHistory"
import { RedisTransactionHistory } from "../services/RedisTransactionHistory"

export type TransactionHistoryType = "etherscan" | "redis" | "ip"

export const bootstrapTransactionHistory = (
  type: TransactionHistoryType,
  options?: any
): TransactionHistory | undefined => {
  switch (type) {
    case "etherscan": {
      const { chainId } = options as { chainId: number }
      const etherscan = new ethers.providers.EtherscanProvider(chainId, process.env.ETHERSCAN_API_KEY)
      const etherscanService = new EtherscanTransactionHistory(etherscan)

      return etherscanService
    }
    case "redis": {
      const redis = new Redis(process.env.REDIS_URL as string)
      const redisService = new RedisTransactionHistory(redis)

      return redisService
    }
    case "ip": {
      const redis = new Redis(process.env.REDIS_URL as string)
      const ipService = new IpTransactionHistory(redis)

      return ipService
    }
    default: {
      return undefined
    }
  }
}

import Redis from "ioredis"
import { defaultMillisecondsLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"
import { normalizeAddress } from "../utils/ethAddressUtils"

export class RedisTransactionHistory implements TransactionHistory {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(address: string, minLayover: number = defaultMillisecondsLayover): Promise<boolean> {
    const normalizedAddress = normalizeAddress(address)
    const timeString = await this.redis.get(normalizedAddress)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(address: string) {
    const normalizedAddress = normalizeAddress(address)
    const nowTime = new Date().toISOString()

    await this.redis.set(normalizedAddress, nowTime)
  }
}

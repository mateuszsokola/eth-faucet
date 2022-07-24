import Redis from "ioredis"
import { defaultMillisecondsLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"

export class RedisTransactionHistory implements TransactionHistory {
  constructor(private readonly redis: Redis) {}

  private normalizeAddress(address: string) {
    return address.toLocaleLowerCase()
  }

  async hasReceivedTokens(address: string, minLayover: number = defaultMillisecondsLayover): Promise<boolean> {
    const normalizedAddress = this.normalizeAddress(address)
    const timeString = await this.redis.get(normalizedAddress)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(address: string) {
    const normalizedAddress = this.normalizeAddress(address)
    const nowTime = new Date().toISOString()

    await this.redis.set(normalizedAddress, nowTime)
  }
}

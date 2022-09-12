import Redis from "ioredis"
import { defaultMillisecondsLayover } from "../consts/env"
import { TransactionHistory } from "../interfaces/TransactionHistory"

export class IpTransactionHistory implements TransactionHistory {
  constructor(private readonly redis: Redis) {}

  async hasReceivedTokens(address: string, minLayover: number = defaultMillisecondsLayover): Promise<boolean> {
    const timeString = await this.redis.get(address)

    if (timeString === null) {
      return false
    }

    const lastTransactionTime = new Date(timeString).getTime()
    const nowTime = new Date().getTime()

    return nowTime - lastTransactionTime < minLayover
  }

  async recordTransaction(address: string) {
    const nowTime = new Date().toISOString()

    await this.redis.set(address, nowTime)
  }
}

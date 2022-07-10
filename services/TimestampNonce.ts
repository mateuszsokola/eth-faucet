import { Nonce } from "../interfaces/Nonce"

const timeTolerance = 600 // 10 minutes

export class TimestampNonce implements Nonce {
  constructor() {}

  async verify(input: string) {
    return new Promise<boolean>((resolve, reject) => {
      const userTimestamp = parseInt(input)
      const currentTimestamp = Math.floor(new Date().getTime() / 1000)

      if (currentTimestamp <= userTimestamp + timeTolerance) {
        return resolve(true)
      }

      return reject(false)
    })
  }

  async generate() {
    return new Promise<string>((resolve) => {
      const timestamp = Math.floor(new Date().getTime() / 1000)
      resolve(`${timestamp}`)
    })
  }
}

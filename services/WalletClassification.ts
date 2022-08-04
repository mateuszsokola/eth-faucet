import { defaultWalletWeiAmount, privilegedWalletWeiAmount } from "../consts/env"

export class WalletClassification {
  constructor(private readonly addresses: string[] = []) {}

  isPrivileged(address: string) {
    return this.addresses.includes(address)
  }

  retrieveAmount(address: string) {
    if (this.isPrivileged(address)) {
      return privilegedWalletWeiAmount
    }

    return defaultWalletWeiAmount
  }
}

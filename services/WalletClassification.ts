import { defaultWalletWeiAmount, privilegedWalletWeiAmount } from "../consts/env"

export class WalletClassification {
  constructor(private readonly addresses: string[] = []) {}

  isPrivileged(address: string | undefined) {
    return this.addresses.includes(address || "")
  }

  retrieveAmount(address: string | undefined) {
    if (this.isPrivileged(address)) {
      return privilegedWalletWeiAmount
    }

    return defaultWalletWeiAmount
  }
}

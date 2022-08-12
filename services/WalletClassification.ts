import { defaultWalletWeiAmount, privilegedWalletWeiAmount } from "../consts/env"
import { normalizeAddress } from "../utils/ethAddressUtils"

export class WalletClassification {
  constructor(private readonly addresses: string[] = []) {}

  isPrivileged(address: string | undefined) {
    const normalizedAddress = normalizeAddress(address || "")
    return this.addresses.includes(normalizedAddress)
  }

  retrieveAmount(address: string | undefined) {
    if (this.isPrivileged(address)) {
      return privilegedWalletWeiAmount
    }

    return defaultWalletWeiAmount
  }
}

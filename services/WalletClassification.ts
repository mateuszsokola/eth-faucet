import {
  defaultWalletEthAmount,
  defaultWalletWeiAmount,
  priviligedWalletEthAmount,
  priviligedWalletWeiAmount
} from "../consts/env"

export class WalletClassification {
  constructor(private readonly addresses: string[] = []) {}

  isPriviliged(address: string) {
    return this.addresses.includes(address)
  }

  retrieveAmount(address: string) {
    if (this.isPriviliged(address)) {
      return priviligedWalletWeiAmount
    }

    return defaultWalletWeiAmount
  }
}

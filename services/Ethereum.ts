import { recoverPersonalSignature } from "@metamask/eth-sig-util"
import { ethers } from "ethers"
import { defaultWeiAmount } from "../consts/env"
import { InsufficientFundsError } from "../errors/InsufficientFundsError"
import { NonceExpiredError } from "../errors/NonceExpiredError"
import { NonEmptyWalletError } from "../errors/NonEmptyWalletError"
import { SignatureMismatchError } from "../errors/SignatureMismatchError"
import { Blockchain } from "../interfaces/Blockchain"
import { Nonce } from "../interfaces/Nonce"
import { extractNonceFromMessage } from "../utils/textMessage"

export class Ethereum implements Blockchain {
  constructor(private readonly wallet: ethers.Wallet, private readonly nonceService: Nonce) {}

  async fundWallet(address: string, amount: BigInt = defaultWeiAmount): Promise<void> {
    try {
      const value = ethers.BigNumber.from(amount.toString())

      const transaction = {
        to: address,
        value
      }
      await this.wallet.sendTransaction(transaction)
    } catch (e: any) {
      if (e?.code === "INSUFFICIENT_FUNDS") {
        throw new InsufficientFundsError()
      }

      throw e
    }
  }

  async verifyMessage(address: string, message: string, signature: string): Promise<boolean> {
    const nonce = extractNonceFromMessage(message)
    const isValid = await this.nonceService.verify(nonce)

    if (!isValid) {
      throw new NonceExpiredError()
    }

    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature
    })

    if (address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      throw new SignatureMismatchError()
    }

    return true
  }

  async verifyReceiver(address: string): Promise<void> {
    const balance = await this.wallet.provider.getBalance(address)

    if (balance.gt(defaultWeiAmount)) {
      throw new NonEmptyWalletError()
    }
  }
}

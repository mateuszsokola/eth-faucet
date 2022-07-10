import { Goerli } from "@usedapp/core"
import { ethers } from "ethers"
import { Ethereum } from "../services/Ethereum"
import { TimestampNonce } from "../services/TimestampNonce"

export const bootstrapEthereum = (chainId: number = Goerli.chainId) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETH_API_URL || "", chainId)
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY || "", provider)

  const nonceService = new TimestampNonce()
  const ethereum = new Ethereum(wallet, nonceService)

  return ethereum
}

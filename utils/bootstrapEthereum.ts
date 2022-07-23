import { Goerli } from "@usedapp/core"
import { ethers } from "ethers"
import { Ethereum } from "../services/Ethereum"
import { TimestampNonce } from "../services/TimestampNonce"
import { bootstrapTransactionHistory } from "./bootstrapTransactionHistory"

export const bootstrapEthereum = (chainId: number = Goerli.chainId) => {
  // Transaction History Service
  const transactionHistoryService = bootstrapTransactionHistory(chainId)

  // Nonce Service
  const nonceService = new TimestampNonce()

  // Blockchain Service
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ETH_API_URL || "", chainId)
  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY || "", provider)
  const ethereum = new Ethereum(wallet, nonceService, transactionHistoryService)

  return ethereum
}

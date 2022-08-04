import { useCallback } from "react"
import { priviligedWallets } from "../consts/wallets"
import { WalletClassification } from "../services/WalletClassification"

export const useWalletClassification = () => {
  const classificationService = new WalletClassification(priviligedWallets)

  const retriveAmount = useCallback((address: string) => {
    return classificationService.retrieveAmount(address)
  }, [])

  return [retriveAmount]
}

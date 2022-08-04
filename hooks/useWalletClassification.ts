import { useCallback } from "react"
import { privilegedWallets } from "../consts/wallets"
import { WalletClassification } from "../services/WalletClassification"

export const useWalletClassification = () => {
  const classificationService = new WalletClassification(privilegedWallets)

  const retriveAmount = useCallback((address: string | undefined) => {
    return classificationService.retrieveAmount(address)
  }, [])

  return [retriveAmount]
}

import { Button } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Goerli, useEthers } from "@usedapp/core"
import { isNil } from "lodash"
import Link from "next/link"
import { hasMetamask } from "../../hooks/hasMetamask"
import { claimTokens, retrieveNonce } from "../../services/HttpClient"
import { messageTemplate } from "../../utils/textMessage"

type BaseClaimButtonProps = {
  onSuccess: () => void
  onError: (message: string) => void
  retrieveCaptcha: () => Promise<string>
}

export const BaseClaimButton = ({ onSuccess, onError, retrieveCaptcha }: BaseClaimButtonProps) => {
  const { account, library, isLoading: loading, activateBrowserWallet, switchNetwork, chainId } = useEthers()
  const installed = hasMetamask()

  const claimGorliEth = async () => {
    try {
      if (isNil(library) || isNil(account)) {
        throw new Error("Wallet is not connected")
      }

      const captchaToken = await retrieveCaptcha()

      const nonce = await retrieveNonce()
      const message = messageTemplate(nonce)

      const signer = library.getSigner()
      const signature = await signer.signMessage(message)

      await claimTokens(account as string, message, signature, captchaToken)
      onSuccess()
    } catch (e: any) {
      if (e.name === "AxiosError" && e.response.data.message) {
        onError(e.response.data.message)
        return
      }

      onError(e?.message || "Something went wrong")
    }
  }

  if (!installed) {
    return (
      <Link href="https://metamask.io/download/" passHref>
        <Button variant="contained" fullWidth>
          Install MetaMask
        </Button>
      </Link>
    )
  }

  if (loading) {
    return <LoadingButton variant="contained" loading fullWidth />
  }

  if (!account) {
    return (
      <Button variant="contained" onClick={() => activateBrowserWallet()} fullWidth>
        Connect wallet
      </Button>
    )
  }

  if (chainId !== Goerli.chainId) {
    return (
      <Button variant="contained" onClick={() => switchNetwork(Goerli.chainId)} fullWidth>
        Switch to Görli network
      </Button>
    )
  }

  return (
    <Button variant="contained" onClick={claimGorliEth} fullWidth>
      Claim Görli ETH
    </Button>
  )
}

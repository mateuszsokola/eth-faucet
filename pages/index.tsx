import type { NextPage } from "next"
import { formatEther } from "@ethersproject/units"
import { Button } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { Goerli, useEthers } from "@usedapp/core"
import detectEthereumProvider from "@metamask/detect-provider"
import { useCallback, useEffect, useRef, useState } from "react"
import { BigNumber } from "ethers"
import { isNil } from "lodash"
import Link from "next/link"
import { Alert } from "../components/Alert"
import { Item } from "../components/Item"
import { RoundedBox } from "../components/RoundedBox"
import { defaultWeiAmount, pollingInterval } from "../consts/env"
import { claimTokens, retrieveNonce } from "../services/HttpClient"
import { messageTemplate } from "../utils/textMessage"

const Home: NextPage = () => {
  const { account, library, isLoading, activateBrowserWallet, switchNetwork, chainId } = useEthers()
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined)
  // Metamask
  const [installed, setInstalled] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const refreshRef = useRef<NodeJS.Timeout | null>(null)

  const claimGorliEth = async () => {
    try {
      setError(undefined)

      if (isNil(library) || isNil(account)) {
        throw new Error("Wallet is not connected")
      }

      const nonce = await retrieveNonce()
      const message = messageTemplate(nonce)

      const signer = library.getSigner()
      const signature = await signer.signMessage(message)

      await claimTokens(account as string, message, signature)
      setSuccess(true)
    } catch (e: any) {
      setSuccess(false)

      if (e.name === "AxiosError" && e.response.data.message) {
        setError(e.response.data.message)
        return
      }

      setError(e?.message || "Something went wrong")
    }
  }

  const retrieveBalance = async () => {
    if (isNil(library) || isNil(account)) {
      setBalance(undefined)
      return
    }

    const balance = await library.getBalance(account)
    setBalance(balance)
  }

  const detectMetamask = async () => {
    const provider = await detectEthereumProvider({ mustBeMetaMask: true })

    if (provider) {
      setInstalled(true)
    }
  }

  const renderButton = useCallback(() => {
    if (!installed) {
      return (
        <Link href="https://metamask.io/download/" passHref>
          <Button variant="contained" fullWidth>
            Install MetaMask
          </Button>
        </Link>
      )
    }

    if (isLoading) {
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
  }, [isLoading, account, chainId])

  useEffect(() => {
    detectMetamask()
  }, [])

  useEffect(() => {
    retrieveBalance()
    refreshRef.current = setTimeout(retrieveBalance, pollingInterval)

    return () => {
      refreshRef.current && clearTimeout(refreshRef.current)
    }
  }, [balance, account, library])

  return (
    <RoundedBox>
      <Item>
        <span>Wallet balance</span>
        <span>{balance ? formatEther(balance) : <>&ndash;</>} ETH (testnet)</span>
      </Item>
      <Item>
        <span>Claimable Görli ETH</span>
        <span>{formatEther(defaultWeiAmount)} ETH (testnet)</span>
      </Item>
      {renderButton()}
      {success && !error && <Alert severity="success">Görli ETH has been dispatched to your wallet. You should receive it within 3 minutes.</Alert>}
      {!success && error && <Alert severity="error">{error}</Alert>}
    </RoundedBox>
  )
}

export default Home

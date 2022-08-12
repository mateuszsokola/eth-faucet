import type { NextPage } from "next"
import { formatEther } from "@ethersproject/units"
import { useEtherBalance, useEthers } from "@usedapp/core"
import { useCallback, useReducer } from "react"
import { Alert } from "../components/Alert"
import { ClaimButton } from "../components/ClaimButton"
import { Item } from "../components/Item"
import { RoundedBox } from "../components/RoundedBox"
import { useWalletClassification } from "../hooks/useWalletClassification"

type Action =
  | {
      type: "success"
    }
  | {
      type: "default"
    }
  | {
      type: "error"
      error: string
    }

type State =
  | {
      status: "success"
    }
  | {
      status: "default"
    }
  | {
      status: "error"
      error: string
    }

const initialState: State = {
  status: "default"
}

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case "error":
      return { status: "error", error: action.error }
    case "success":
      return { status: "success" }
    default:
      return { status: "default" }
  }
}

const Home: NextPage = () => {
  const { account } = useEthers()
  const [state, dispatch] = useReducer(reducer, initialState)
  const balance = useEtherBalance(account, { refresh: "everyBlock" })
  const [retrieveAmount] = useWalletClassification()

  const handleSuccess = () => dispatch({ type: "success" })

  const handleError = (error: string) => dispatch({ type: "error", error })

  const renderAlert = useCallback(() => {
    switch (state.status) {
      case "success":
        return (
          <Alert severity="success">
            Görli ETH has been dispatched to your wallet. You should receive it within 3 minutes.
          </Alert>
        )
      case "error":
        return <Alert severity="error">{state.error}</Alert>
      default:
        return null
    }
  }, [state.status])

  return (
    <RoundedBox>
      <Item>
        <span>Wallet balance</span>
        <span>{balance ? formatEther(balance) : <>&ndash;</>} ETH (testnet)</span>
      </Item>
      <Item>
        <span>Claimable Görli ETH</span>
        <span>{formatEther(retrieveAmount(account))} ETH (testnet)</span>
      </Item>
      <ClaimButton onSuccess={handleSuccess} onError={handleError} />
      {renderAlert()}
    </RoundedBox>
  )
}

export default Home

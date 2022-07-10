import { ethers } from "ethers"

const run = async () => {
  const wallet = ethers.Wallet.createRandom()

  console.log("Your new Ethereum wallet credentials:")
  console.log("\n\n")
  console.log(`export WALLET_ADDRESS=${wallet.address}\n`)
  console.log(`export WALLET_MNEMONIC_PHRASE=${wallet.mnemonic.phrase}\n`)
  console.log(`export WALLET_PRIVATE_KEY=${wallet.privateKey}\n`)
  console.log("\n\n")
}

run()

The `eth-faucet` is a developer tool to get testnet Ether (ETH) in order to test and troubleshoot your decentralized application (DApp) before going live on Ethereum mainnet, where you must use real ETH.

![Screenshot](./screenshot.png)

Live version: **[eth-faucet-alpha.vercel.app](https://eth-faucet-alpha.vercel.app)**

## Getting Started

1. First, create a new Ethereum wallet:

```bash
yarn create-wallet
```

You should receive wallet credentials printed to your console:

```
export WALLET_ADDRESS=0x0000000000000000000000000000000000000000
export WALLET_MNEMONIC_PHRASE=fluffy kitten hates cats although it is a cat
export WALLET_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
```

**Write those credentials down**, you will need it!

2. Now, you need to find the Ethereum API for Görli network. I’m using Infura and you can use it as well. Just [create a free account](https://infura.io) and generate API keys for Görli network.

3. Once you have your API keys, create a `.env.local` file, and specify the following variables:

```
WALLET_PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
NEXT_PUBLIC_ETH_API_URL=https://goerli.infura.io/v3/00000000000000000000000000000000
NEXT_PUBLIC_DEFAULT_ETH_AMOUNT=0.25 # This one is optional
```

4. Finally, we can run our app:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see it.

## How to top up the wallet with Görli ETH?

You can use [this faucet](https://goerli-faucet.mudit.blog/) to request some testnet Ethereum.

## How to change amount of distributed Görli ETH?

Set the `NEXT_PUBLIC_DEFAULT_ETH_AMOUNT` variable in your `.env` file. For example:

```
NEXT_PUBLIC_DEFAULT_ETH_AMOUNT=5 # 5 ETH per claim
```

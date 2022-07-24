export const defaultEthAmount =
  process.env.NEXT_PUBLIC_DEFAULT_ETH_AMOUNT !== undefined
    ? parseFloat(process.env.NEXT_PUBLIC_DEFAULT_ETH_AMOUNT)
    : 0.25

export const defaultWeiAmount = BigInt(defaultEthAmount * 10 ** 18)

export const pollingInterval = 20_000

export const defaultMillisecondsLayover = 86400000 // 24h

export const defaultBlockLayover = 5400 // ~24h, 16s per block on Görli

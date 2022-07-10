export const defaultEthAmount =
  process.env.NEXT_PUBLIC_DEFAULT_ETH_AMOUNT !== undefined
    ? parseFloat(process.env.NEXT_PUBLIC_DEFAULT_ETH_AMOUNT)
    : 0.25

export const defaultWeiAmount = BigInt(defaultEthAmount * 10 ** 18)

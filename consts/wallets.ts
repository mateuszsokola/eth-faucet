import { normalizeAddress } from "../utils/ethAddressUtils"

const rawPrivilegedWallets: string[] = []

export const privilegedWallets = rawPrivilegedWallets.map(normalizeAddress)

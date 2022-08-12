import { normalizeAddress } from "../utils/ethAddressUtils"

const rawPrivilegedWallets = [
  "0xd5e73f9199E67b6Ff8DFACE1767A1BDAdf1A7242",
  "0xbd9003EAF07503C80dBdfe11a787c678598Ab868",
  "0x0BE3b5Fb97A02Ad6caC9930Ea1ef684063080316",
  "0x1eC7fa23a8468f1F3a135BFeFe6D678E1657Ee65",
  "0x4268607537F34869fBb58a1B52209CcB061B3b74",
  "0x9308245A3Ca756b506fa1D3a1962b5a563F92470",
  "0x83Ae19567e0238F464062511bBB0d570De910Eb3",
  "http404.eth",
  "0xaD2143748ce26940952B221775f5D683E4572f7B",
  "0x1718724AeC24b2Ef11c60754DC99272E5b9d14FF",
  "0x91099E400cfaa9aA222eD6aA998aF7Df25817074"
]

export const privilegedWallets = rawPrivilegedWallets.map(normalizeAddress)

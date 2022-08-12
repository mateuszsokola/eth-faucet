export const normalizeAddress = (address: string) => {
  return address.toLocaleLowerCase()
}

export const compareAddresses = (a: string, b: string) => {
  return normalizeAddress(a) === normalizeAddress(b)
}

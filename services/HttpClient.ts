import axios from "axios"

const httpClient = axios.create({ baseURL: "/api" })

export const retrieveNonce = async () => {
  const response = await httpClient.get("/nonce").then(({ data }) => data)

  return response.data.nonce
}

export const claimTokens = async (address: string, message: string, signature: string, captcha: string) => {
  return await httpClient.post("/claim", { address, message, signature, captcha }).then(({ data }) => data)
}

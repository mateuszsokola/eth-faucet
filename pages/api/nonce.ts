import type { NextApiRequest, NextApiResponse } from "next"
import { NonceResponseBody } from "../../interfaces/Nonce"
import { DefaultResponse } from "../../interfaces/Response"
import { TimestampNonce } from "../../services/TimestampNonce"

type NonceResponse = DefaultResponse<NonceResponseBody>

const handler = async (req: NextApiRequest, res: NextApiResponse<NonceResponse>) => {
  const nonceService = new TimestampNonce()
  const nonce = await nonceService.generate()

  res.status(200).json({
    status: "ok",
    data: {
      nonce
    }
  })
}

export default handler

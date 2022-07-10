export interface SuccessResponse<K = undefined> {
  status: "ok"
  data?: K
}

export interface ErrorResponse {
  status: "error"
  message: string
}

export type DefaultResponse<K = undefined> = SuccessResponse<K> | ErrorResponse

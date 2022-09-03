import { GoogleReCaptcha } from "../services/GoogleReCaptcha"

export const bootstrapCaptcha = () => {
  switch (process.env.NEXT_PUBLIC_ENABLE_CAPTCHA) {
    case "recaptcha_v3": {
      const apiKey = process.env.RECAPTCHA_SECRET_KEY as string
      const captchaService = new GoogleReCaptcha(apiKey)

      return captchaService
    }
    default: {
      return undefined
    }
  }
}

import { BaseClaimButton } from "./_BaseClaimButton"
import { GoogleReCaptchaClaimButton } from "./_GoogleReCaptchaClaimButton"

type ClaimButtonProps = {
  onSuccess: () => void
  onError: (message: string) => void
}

export const ClaimButton = (props: ClaimButtonProps) => {
  switch (process.env.NEXT_PUBLIC_ENABLE_CAPTCHA) {
    case "recaptcha_v3": {
      return <GoogleReCaptchaClaimButton {...props} />
    }
    default: {
      const retrieveCaptcha = async (): Promise<string> => {
        return new Promise((resolve) => resolve(""))
      }

      return <BaseClaimButton {...props} retrieveCaptcha={retrieveCaptcha} />
    }
  }
}

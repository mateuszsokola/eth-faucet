import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { BaseClaimButton } from "./_BaseClaimButton"

type GoogleReCaptchaClaimButtonProps = {
  onSuccess: () => void
  onError: (message: string) => void
}

export const GoogleReCaptchaClaimButton = (props: GoogleReCaptchaClaimButtonProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const retrieveCaptcha = async () => {
    if (!executeRecaptcha) {
      throw new Error("Couldn’t generate captcha")
    }

    return await executeRecaptcha("claim")
  }

  return <BaseClaimButton {...props} retrieveCaptcha={retrieveCaptcha} />
}

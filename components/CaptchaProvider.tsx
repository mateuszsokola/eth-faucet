import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

type CaptchaProviderProps = {
  children: JSX.Element
}

export const CaptchaProvider = ({ children }: CaptchaProviderProps) => {
  switch (process.env.NEXT_PUBLIC_ENABLE_CAPTCHA) {
    case "recaptcha_v3": {
      const siteApiKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string

      return (
        <GoogleReCaptchaProvider reCaptchaKey={siteApiKey} language="en">
          {children}
        </GoogleReCaptchaProvider>
      )
    }
    default: {
      return children
    }
  }
}

import axios from "axios"
import { InvalidCaptcha } from "../errors/InvalidCaptcha"
import { Captcha } from "../interfaces/Captcha"

export class GoogleReCaptcha implements Captcha {
  constructor(private readonly apiKey: string) {}

  async verifyCaptcha(token: string) {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.apiKey}&response=${token}`
    const response = await axios.post(url).then((response) => response.data)

    if (response.success === true) {
      return true
    }

    throw new InvalidCaptcha()
  }
}

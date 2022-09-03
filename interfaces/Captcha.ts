export interface Captcha {
  verifyCaptcha(token: string): Promise<boolean>
}

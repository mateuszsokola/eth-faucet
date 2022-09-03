export class InvalidCaptcha extends Error {
  code = 403
  message = "Provided captcha was invalid."
}

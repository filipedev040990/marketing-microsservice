import { EmailValidatorInterface } from '@/application/contracts/email-validator.interface'

export class EmailValidator implements EmailValidatorInterface {
  validate (email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return regex.test(email)
  }
}

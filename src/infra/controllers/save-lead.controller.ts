import { ControllerInterface } from '@/application/contracts/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types'

export class SaveLeadController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<any> {
    const inputError = this.inputValidator(input)
    if (inputError) {
      return badRequest(inputError)
    }

    return null
  }

  private inputValidator (input: HttpRequest): Error | undefined {
    const requiredFields = ['name', 'email', 'birthDate', 'phoneNumber']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }

    const invalideEmailError = this.emailValidator(input.body.email)
    if (!invalideEmailError) {
      return new InvalidParamError('email')
    }
  }

  private emailValidator (email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return regex.test(email)
  }
}

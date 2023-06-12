import { ControllerInterface } from '@/application/contracts/controller.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types'

export class SaveLeadController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<any> {
    const requiredFieldsError = this.requiredFieldsValidator(input)
    if (requiredFieldsError) {
      return badRequest(requiredFieldsError)
    }

    const invalideEmailError = this.emailValidator(input.body.email)
    if (invalideEmailError) {
      return badRequest(invalideEmailError)
    }

    return null
  }

  private requiredFieldsValidator (input: HttpRequest): Error | undefined {
    const requiredFields = ['name', 'email', 'birthDate', 'phoneNumber']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }

  private emailValidator (email: string): Error | undefined {
    const regex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (!regex.test(email)) {
      return new InvalidParamError('email')
    }
  }
}

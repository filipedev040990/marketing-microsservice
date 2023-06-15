import { ControllerInterface } from '@/application/contracts/controller.interface'
import { SaveLeadUseCaseInterface } from '@/application/contracts/save-lead.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, serverError, success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types'

export class SaveLeadController implements ControllerInterface {
  constructor (private readonly saveLeadUseCase: SaveLeadUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const inputError = this.inputValidator(input)
      if (inputError) {
        return badRequest(inputError)
      }

      const output = await this.saveLeadUseCase.execute(input.body)

      return success(201, output)
    } catch (error) {
      return serverError(error)
    }
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

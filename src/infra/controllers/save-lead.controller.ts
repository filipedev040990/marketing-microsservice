import { ControllerInterface } from '@/application/contracts/controller.interface'
import { MissingParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { HttpRequest } from '@/shared/types'

export class SaveLeadController implements ControllerInterface {
  async execute (input: HttpRequest): Promise<any> {
    const inputError = this.validate(input)
    if (inputError) {
      return badRequest(inputError)
    }

    return null
  }

  private validate (input: HttpRequest): Error | undefined {
    const requiredFields = ['name']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}

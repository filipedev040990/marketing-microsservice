import { HttpRequest } from '@/shared/types'
import { SaveLeadController } from './save-lead.controller'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { mock } from 'jest-mock-extended'
import { SaveLeadUseCaseInterface } from '@/domain/contracts/save-lead.interface'
import { badRequest, serverError } from '@/shared/helpers/http.helper'

const saveLeadUseCase = mock<SaveLeadUseCaseInterface>()

describe('SaveLeadController', () => {
  let sut: SaveLeadController
  let input: HttpRequest

  beforeAll(() => {
    sut = new SaveLeadController(saveLeadUseCase)
  })

  beforeEach(() => {
    input = {
      body: {
        name: 'AnyName',
        email: 'anyEmail@email.com',
        birthDate: '1990-01-01',
        phoneNumber: '32995210252'
      }
    }
  })

  test('should return 400 if any required field does not provided', async () => {
    const requiredFields = ['name', 'email', 'birthDate', 'phoneNumber']

    for (const field of requiredFields) {
      const backupFieldValue = input.body[field]

      input.body[field] = null

      const output = await sut.execute(input)

      expect(output).toEqual(badRequest(new MissingParamError(field)))

      input.body[field] = backupFieldValue
    }
  })

  test('should return 400 if invalid email is provided', async () => {
    input.body.email = 'invalidEmail'

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should call SaveLeadUseCase once and with correct values', async () => {
    await sut.execute(input)

    expect(saveLeadUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveLeadUseCase.execute).toHaveBeenCalledWith(input.body)
  })

  test('should return 201', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 201,
      body: null
    })
  })

  test('should return 500 if SaveLeadUseCase throws', async () => {
    saveLeadUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(new Error()))
  })
})

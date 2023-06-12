import { HttpRequest } from '@/shared/types'
import { SaveLeadController } from './save-lead.controller'
import { MissingParamError } from '@/shared/errors'

describe('SaveLeadController', () => {
  let sut: SaveLeadController
  let input: HttpRequest

  beforeAll(() => {
    sut = new SaveLeadController()

    input = {
      body: {
        name: 'AnyName',
        email: 'anyEmail',
        birthDate: '1990-01-01',
        phoneNumber: '32995210252'
      }
    }
  })

  test('should return 400 if name is not provided', async () => {
    input.body.name = null

    const output = await sut.execute(input)

    expect(output).toEqual({
      statusCode: 400,
      body: new MissingParamError('name')
    })
  })
})

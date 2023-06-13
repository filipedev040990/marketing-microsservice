import { EmailValidator } from './email.validator'

describe('EmailValidator', () => {
  let sut: EmailValidator

  beforeAll(() => {
    sut = new EmailValidator()
  })
  test('should return true', () => {
    expect(sut.validate('validEmail@email.com.br')).toBeTruthy()
  })
  test('should return false', () => {
    expect(sut.validate('invalidEmail')).toBeFalsy()
  })
})

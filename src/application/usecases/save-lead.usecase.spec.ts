import { SaveLeadUseCaseInterface } from '@/domain/contracts/save-lead.interface'
import { SaveLeadUseCase } from './save-lead.usecase'
import { mock } from 'jest-mock-extended'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'

describe('SaveLeadUseCase', () => {
  let sut: SaveLeadUseCase
  let input: SaveLeadUseCaseInterface.Input
  const uuid = mock<UUIDGeneratorInterface>()

  beforeAll(() => {
    sut = new SaveLeadUseCase(uuid)

    input = {
      name: 'anyName',
      email: 'anyEmail',
      birthDate: new Date('1990-01-01'),
      phoneNumber: '32999652363'
    }

    uuid.generate.mockReturnValue('anyUuid')
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })
})

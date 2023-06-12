import { SaveLeadUseCaseInterface } from '@/domain/contracts/save-lead.interface'
import { SaveLeadUseCase } from './save-lead.usecase'
import { mock } from 'jest-mock-extended'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'
import { SaveLeadRepositoryInterface } from '@/domain/contracts/lead-repository.interface'

describe('SaveLeadUseCase', () => {
  let sut: SaveLeadUseCase
  let input: SaveLeadUseCaseInterface.Input

  const uuid = mock<UUIDGeneratorInterface>()
  const leadRepository = mock<SaveLeadRepositoryInterface>()

  beforeAll(() => {
    sut = new SaveLeadUseCase(uuid, leadRepository)

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

  test('should call LeadRepository once and with correct values', async () => {
    await sut.execute(input)

    expect(leadRepository.save).toHaveBeenCalledTimes(1)
    expect(leadRepository.save).toHaveBeenCalledWith({
      id: 'anyUuid',
      name: 'anyName',
      email: 'anyEmail',
      birthDate: new Date('1990-01-01'),
      phoneNumber: '32999652363',
      status: 'lead',
      createdAt: new Date()
    })
  })
})

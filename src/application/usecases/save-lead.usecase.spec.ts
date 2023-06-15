import { SaveLeadUseCaseInterface } from '@/application/contracts/save-lead.interface'
import { SaveLeadUseCase } from './save-lead.usecase'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'
import { SaveLeadRepositoryInterface } from '@/application/contracts/lead-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

describe('SaveLeadUseCase', () => {
  let sut: SaveLeadUseCase
  let input: SaveLeadUseCaseInterface.Input

  const uuid = mock<UUIDGeneratorInterface>()
  const leadRepository = mock<SaveLeadRepositoryInterface>()
  const identifierGeneratorMock = jest.spyOn(SaveLeadUseCase.prototype as any, 'identifierGenerator')

  beforeAll(() => {
    MockDate.set(new Date())

    sut = new SaveLeadUseCase(uuid, leadRepository)

    leadRepository.save.mockResolvedValue({
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'lead',
      phoneNumber: '32999652363'
    })

    input = {
      name: 'anyName',
      email: 'anyEmail',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      phoneNumber: '32999652363'
    }

    uuid.generate.mockReturnValue('anyUuid')
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call UUIDGenerator once', async () => {
    await sut.execute(input)

    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  test('should call LeadRepository once and with correct values', async () => {
    identifierGeneratorMock.mockReturnValue('anyIdentifier')
    await sut.execute(input)

    expect(leadRepository.save).toHaveBeenCalledTimes(1)
    expect(leadRepository.save).toHaveBeenCalledWith({
      id: 'anyUuid',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      phoneNumber: '32999652363',
      status: 'lead',
      createdAt: new Date()
    })
  })

  test('should return an Lead', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual({
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'lead',
      phoneNumber: '32999652363'
    })
  })
})

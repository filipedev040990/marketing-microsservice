import { UpdateStatusLeadUseCaseInterface } from '@/application/contracts/update-status-lead-usecase.interface'
import { UpdateStatusLeadUseCase } from './update-status-lead.usecase'
import { UpdateStatusLeadRepositoryInterface } from '../contracts/lead-repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

describe('UpdateStatusLeadUseCase', () => {
  let sut: UpdateStatusLeadUseCase
  let input: UpdateStatusLeadUseCaseInterface.Input
  const leadRepository = mock<UpdateStatusLeadRepositoryInterface>()

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new UpdateStatusLeadUseCase(leadRepository)
    input = {
      id: 'anyId',
      status: 'client'
    }
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LeadRepository.update once and with correct values', async () => {
    await sut.execute(input)

    expect(leadRepository.update).toHaveBeenCalledTimes(1)
    expect(leadRepository.update).toHaveBeenCalledWith({
      id: 'anyId',
      status: 'client',
      updatedAt: new Date()
    })
  })
})

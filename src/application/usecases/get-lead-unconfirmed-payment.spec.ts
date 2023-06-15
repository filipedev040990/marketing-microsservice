import { GetLeadByStatusRepositoryInterface } from '../contracts/lead-repository.interface'
import { mock } from 'jest-mock-extended'
import { GetLeadUnconfirmedPaymentUseCase } from './get-lead-unconfirmed-payment'

describe('GetLeadUnconfirmedPaymentUseCase', () => {
  const status: string = 'lead'
  const leadRepository = mock<GetLeadByStatusRepositoryInterface>()
  let sut: GetLeadUnconfirmedPaymentUseCase

  beforeAll(() => {
    sut = new GetLeadUnconfirmedPaymentUseCase(leadRepository)
  })

  test('should call LeadRepository.getByStatus', async () => {
    await sut.execute()

    expect(leadRepository.getByStatus).toHaveBeenCalledTimes(1)
    expect(leadRepository.getByStatus).toHaveBeenCalledWith(status)
  })
})

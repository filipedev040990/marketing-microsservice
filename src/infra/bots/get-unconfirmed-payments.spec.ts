import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'
import { mock } from 'jest-mock-extended'
import { GetUnconfirmedPayments } from './get-unconfirmed-payments'

const getLeadUnconfirmedPaymentUseCase = mock<GetLeadUnconfirmedPaymentUseCaseInterface>()

describe('GetUnconfirmedPayments', () => {
  let sut: GetUnconfirmedPayments

  beforeAll(() => {
    sut = new GetUnconfirmedPayments(getLeadUnconfirmedPaymentUseCase)
  })
  test('should call GetLeadUnconfirmedPaymentUseCase once', async () => {
    await sut.execute()

    expect(getLeadUnconfirmedPaymentUseCase.execute).toHaveBeenCalledTimes(1)
  })
})

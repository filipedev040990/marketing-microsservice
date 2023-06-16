import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'
import { mock } from 'jest-mock-extended'
import { GetUnconfirmedPaymentsBot } from './get-unconfirmed-payments.bot'
import { PublishNotificationInExchaneUseCaseInterface } from '@/application/contracts/publish-notification-in-exchange-usecase.interface'

const getLeadUnconfirmedPaymentUseCase = mock<GetLeadUnconfirmedPaymentUseCaseInterface>()
const publishNotificationInExchange = mock<PublishNotificationInExchaneUseCaseInterface>()

describe('GetUnconfirmedPaymentsBot', () => {
  let sut: GetUnconfirmedPaymentsBot

  beforeAll(() => {
    sut = new GetUnconfirmedPaymentsBot(getLeadUnconfirmedPaymentUseCase, publishNotificationInExchange)

    getLeadUnconfirmedPaymentUseCase.execute.mockResolvedValue([
      {
        name: 'anotherName',
        email: 'anotherEmail@email.com',
        status: 'lead',
        createdAt: new Date('anyDate')
      },
      {
        name: 'fakeName',
        email: 'fakeEmail@email.com',
        status: 'lead',
        createdAt: new Date('anyDate')
      }])
  })

  test('should call GetLeadUnconfirmedPaymentUseCase once', async () => {
    await sut.execute()

    expect(getLeadUnconfirmedPaymentUseCase.execute).toHaveBeenCalledTimes(1)
  })

  test('should call Queue.publish if getLeadUnconfirmedPaymentUseCase is not empty', async () => {
    await sut.execute()

    expect(publishNotificationInExchange.execute).toHaveBeenCalledTimes(2)
  })
})

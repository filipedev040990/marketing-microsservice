import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'
import { mock } from 'jest-mock-extended'
import { GetUnconfirmedPaymentsJob } from './get-unconfirmed-payments.job'
import { PublishNotificationInExchaneUseCaseInterface } from '@/application/contracts/publish-notification-in-exchange-usecase.interface'

const getLeadUnconfirmedPaymentUseCase = mock<GetLeadUnconfirmedPaymentUseCaseInterface>()
const publishNotificationInExchange = mock<PublishNotificationInExchaneUseCaseInterface>()

describe('GetUnconfirmedPaymentsJob', () => {
  let sut: GetUnconfirmedPaymentsJob

  beforeAll(() => {
    sut = new GetUnconfirmedPaymentsJob(getLeadUnconfirmedPaymentUseCase, publishNotificationInExchange)

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

  test('should call Queue.publish with correct values', async () => {
    getLeadUnconfirmedPaymentUseCase.execute.mockResolvedValueOnce([
      {
        name: 'anotherName',
        email: 'anotherEmail@email.com',
        status: 'lead',
        createdAt: new Date('anyDate')
      }])

    await sut.execute()

    expect(publishNotificationInExchange.execute).toHaveBeenCalledTimes(1)
    expect(publishNotificationInExchange.execute).toHaveBeenCalledWith({
      exchange: 'send_notification',
      routingKey: 'unconfirmed_payments',
      message: {
        subject: 'Inscrição não concluída',
        to: 'anotherEmail@email.com',
        body: 'Olá, anotherName tudo bem? Observamos que você não concluiu sua matricula em nossa plataforma. Para ajuda, contacte nosso suporte pelo email suporte@email.com.br'
      }
    })
  })
})

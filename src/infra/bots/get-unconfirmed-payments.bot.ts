import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'
import { PublishNotificationInExchaneUseCaseInterface } from '@/application/contracts/publish-notification-in-exchange-usecase.interface'
import constants from '@/shared/constants'

export class GetUnconfirmedPaymentsBot {
  constructor (
    private readonly getLeadUnconfirmedPaymentUseCase: GetLeadUnconfirmedPaymentUseCaseInterface,
    private readonly publishNotificationInExchange: PublishNotificationInExchaneUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    const leads = await this.getLeadUnconfirmedPaymentUseCase.execute()
    if (leads.length) {
      for (const lead of leads) {
        const message = {
          subject: constants.UNCONFIRMED_PAYMENT_NOTIFICATION_SUBJECT,
          to: lead.email,
          body: `Olá, ${lead.name} tudo bem? Observamos que você não concluiu sua matricula em nossa plataforma. Para ajuda, contacte nosso suporte pelo email ${constants.SUPPORT_EMAIL}`
        }

        await this.publishNotificationInExchange.execute({
          exchange: constants.QUEUE_EXCHANGE_SEND_NOTIFICATION,
          routingKey: constants.QUEUE_EXCHANGE_SEND_NOTIFICATION_ROUNTING_KEY,
          message
        })
      }
    }
  }
}

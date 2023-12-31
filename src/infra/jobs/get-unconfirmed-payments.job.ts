import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'
import { PublishNotificationInExchaneUseCaseInterface } from '@/application/contracts/publish-notification-in-exchange-usecase.interface'
import { SaveNotificationUseCaseInterface } from '@/application/contracts/save-notification-usecase.interface'
import constants from '@/shared/constants'

export class GetUnconfirmedPaymentsJob {
  constructor (
    private readonly getLeadUnconfirmedPaymentUseCase: GetLeadUnconfirmedPaymentUseCaseInterface,
    private readonly publishNotificationInExchange: PublishNotificationInExchaneUseCaseInterface,
    private readonly saveNotificationUseCase: SaveNotificationUseCaseInterface
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
          exchange: constants.QUEUE_EXCHANGE_NOTIFICATION,
          routingKey: constants.UNCONFIRMED_PAYMENT_ROUTING_KEY,
          message: JSON.stringify(message)
        })

        await this.saveNotificationUseCase.execute(lead.email)
      }
    }
  }
}

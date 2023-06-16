import constants from '@/shared/constants'
import { GetLeadUnconfirmedPaymentUseCaseInterface } from '../contracts/get-lead-unconfirmed-payment-usecase.interface'
import { GetLeadByStatusRepositoryInterface } from '../contracts/lead-repository.interface'
import { GetNotificationByEmailRepository } from '../contracts/notification-repository.interface'

export class GetLeadUnconfirmedPaymentUseCase implements GetLeadUnconfirmedPaymentUseCaseInterface {
  constructor (
    private readonly repository: GetLeadByStatusRepositoryInterface,
    private readonly notificationRepository: GetNotificationByEmailRepository
  ) {}

  async execute (): Promise<GetLeadUnconfirmedPaymentUseCaseInterface.Output[] | []> {
    const output: GetLeadUnconfirmedPaymentUseCaseInterface.Output[] = []
    const leads = await this.repository.getByStatus(constants.LEAD_STATUS)

    if (leads) {
      for (const lead of leads) {
        const unconfirmedPaymentDays = this.calculateUnconfirmedPaymentDays(lead.createdAt)
        await this.notificationRepository.getByEmail(lead.email)
        if (lead.status === constants.LEAD_STATUS && unconfirmedPaymentDays >= constants.DAYS_UNCONFIRMED_PAYMENT_TO_SEND_NOTIFICATION) {
          output.push({
            name: lead.name,
            email: lead.email,
            status: lead.status,
            createdAt: lead.createdAt
          })
        }
      }
    }

    return output
  }

  private calculateUnconfirmedPaymentDays (createdAt: Date): number {
    const date1: Date = createdAt
    const date2: Date = new Date()

    const differenceInMs: number = date2.getTime() - date1.getTime()
    return Math.floor(differenceInMs / (1000 * 60 * 60 * 24))
  }
}

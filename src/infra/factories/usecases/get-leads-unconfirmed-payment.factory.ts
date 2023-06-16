import { GetLeadUnconfirmedPaymentUseCase } from '@/application/usecases/get-lead-unconfirmed-payment'
import { LeadRepository } from '@/infra/database/postgres/repositories/lead.repository'
import { NotificationRepository } from '@/infra/database/postgres/repositories/notification.repository'

export const makeGetLeadsUnconfirmedPayments = (): GetLeadUnconfirmedPaymentUseCase => {
  const leadRepository = new LeadRepository()
  const notificationRepository = new NotificationRepository()
  return new GetLeadUnconfirmedPaymentUseCase(leadRepository, notificationRepository)
}

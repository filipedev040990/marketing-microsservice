import { GetLeadUnconfirmedPaymentUseCase } from '@/application/usecases/get-lead-unconfirmed-payment'
import { LeadRepository } from '@/infra/database/postgres/repositories/lead.repository'

export const makeGetLeadsUnconfirmedPayments = (): GetLeadUnconfirmedPaymentUseCase => {
  const repository = new LeadRepository()
  return new GetLeadUnconfirmedPaymentUseCase(repository)
}

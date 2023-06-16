import { UpdateStatusLeadUseCase } from '@/application/usecases/update-status-lead.usecase'
import { LeadRepository } from '@/infra/database/postgres/repositories/lead.repository'

export const makeUpdateStatusLeadUseCase = (): UpdateStatusLeadUseCase => {
  const repository = new LeadRepository()
  return new UpdateStatusLeadUseCase(repository)
}

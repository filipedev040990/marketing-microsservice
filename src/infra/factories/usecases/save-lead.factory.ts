import { SaveLeadUseCase } from '@/application/usecases/save-lead.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { LeadRepository } from '@/infra/database/postgres/repositories/lead.repository'

export const makeSaveLeadUseCaseFactory = (): SaveLeadUseCase => {
  const uuidGenerator = new UUIDGenerator()
  const repository = new LeadRepository()
  return new SaveLeadUseCase(uuidGenerator, repository)
}

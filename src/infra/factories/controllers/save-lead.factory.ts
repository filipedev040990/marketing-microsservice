import { SaveLeadController } from '@/infra/controllers/save-lead.controller'
import { makeSaveLeadUseCaseFactory } from '../usecases/save-lead.factory'

export const makeSaveLeadControllerFactory = (): SaveLeadController => {
  return new SaveLeadController(makeSaveLeadUseCaseFactory())
}

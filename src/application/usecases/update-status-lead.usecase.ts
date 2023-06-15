import { UpdateStatusLeadRepositoryInterface } from '../contracts/lead-repository.interface'
import { UpdateStatusLeadUseCaseInterface } from '../contracts/update-status-lead-usecase.interface'

export class UpdateStatusLeadUseCase implements UpdateStatusLeadUseCaseInterface {
  constructor (private readonly repository: UpdateStatusLeadRepositoryInterface) {}
  async execute (input: UpdateStatusLeadUseCaseInterface.Input): Promise<void> {
    await this.repository.update({
      id: input.id,
      status: input.status,
      updatedAt: new Date()
    })
  }
}

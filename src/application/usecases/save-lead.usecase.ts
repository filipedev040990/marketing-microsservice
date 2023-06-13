import { SaveLeadUseCaseInterface } from '@/domain/contracts/save-lead.interface'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'
import { SaveLeadRepositoryInterface } from '@/domain/contracts/lead-repository.interface'
import constants from '@/shared/constants'

export class SaveLeadUseCase implements SaveLeadUseCaseInterface {
  constructor (
    private readonly uuid: UUIDGeneratorInterface,
    private readonly repository: SaveLeadRepositoryInterface
  ) {}

  async execute (input: SaveLeadUseCaseInterface.Input): Promise<SaveLeadUseCaseInterface.Output> {
    return await this.repository.save({
      id: this.uuid.generate(),
      name: input.name.trim(),
      email: input.email.trim(),
      birthDate: new Date(input.birthDate),
      phoneNumber: input.phoneNumber.trim(),
      status: constants.leadStatus,
      createdAt: new Date()
    })
  }
}
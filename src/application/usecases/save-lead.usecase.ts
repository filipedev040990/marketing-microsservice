import { SaveLeadUseCaseInterface } from '@/domain/contracts/save-lead.interface'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'

export class SaveLeadUseCase implements SaveLeadUseCaseInterface {
  constructor (
    private readonly uuid: UUIDGeneratorInterface
  ) {}

  async execute (input: SaveLeadUseCaseInterface.Input): Promise<any> {
    this.uuid.generate()
    return null
  }
}

import { SaveLeadUseCaseInterface } from '@/application/contracts/save-lead.interface'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'
import { SaveLeadRepositoryInterface } from '@/application/contracts/lead-repository.interface'
import constants from '@/shared/constants'

export class SaveLeadUseCase implements SaveLeadUseCaseInterface {
  constructor (
    private readonly uuid: UUIDGeneratorInterface,
    private readonly repository: SaveLeadRepositoryInterface
  ) {}

  async execute (input: SaveLeadUseCaseInterface.Input): Promise<SaveLeadUseCaseInterface.Output> {
    return await this.repository.save({
      id: this.uuid.generate(),
      identifier: this.identifierGenerator(),
      name: input.name.trim(),
      email: input.email.trim(),
      document: input.document,
      birthDate: new Date(input.birthDate),
      phoneNumber: input.phoneNumber.trim(),
      status: constants.LEAD_STATUS,
      createdAt: new Date()
    })
  }

  private identifierGenerator (): string {
    const max: number = 5
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789'
    let str: string = ''

    for (let i = 0; i <= max; i++) {
      str += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const timeStamp = new Date().getTime()
    return `${str}-${timeStamp}`
  }
}

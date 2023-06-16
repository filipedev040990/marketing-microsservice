import { SaveNotificationRepositoryInterface } from '../contracts/notification-repository.interface'
import { SaveNotificationUseCaseInterface } from '../contracts/save-notification-usecase.interface'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'

export class SaveNotificationUseCase implements SaveNotificationUseCaseInterface {
  constructor (
    private readonly repository: SaveNotificationRepositoryInterface,
    private readonly uuidGenerator: UUIDGeneratorInterface
  ) {}

  async execute (email: string): Promise<void> {
    await this.repository.save({
      id: this.uuidGenerator.generate(),
      email,
      sendAt: new Date()
    })
  }
}

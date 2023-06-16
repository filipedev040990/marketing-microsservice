import { SaveNotificationRepositoryInterface } from '../contracts/notification-repository.interface'
import { SaveNotificationUseCaseInterface } from '../contracts/save-notification-usecase.interface'

export class SaveNotificationUseCase implements SaveNotificationUseCaseInterface {
  constructor (private readonly repository: SaveNotificationRepositoryInterface) {}
  async execute (email: string): Promise<void> {
    await this.repository.save({
      email,
      sendAt: new Date()
    })
  }
}

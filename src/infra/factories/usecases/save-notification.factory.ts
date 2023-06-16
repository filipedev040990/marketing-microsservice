import { SaveNotificationUseCase } from '@/application/usecases/save-notification.usecase'
import { UUIDGenerator } from '@/infra/adapters/uuid-generator.adapter'
import { NotificationRepository } from '@/infra/database/postgres/repositories/notification.repository'

export const makeSaveNotificationUseCase = (): SaveNotificationUseCase => {
  const repository = new NotificationRepository()
  const uuidGenerator = new UUIDGenerator()
  return new SaveNotificationUseCase(repository, uuidGenerator)
}

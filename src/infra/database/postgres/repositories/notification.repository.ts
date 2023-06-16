import { GetNotificationByEmailRepositoryInterface, SaveNotificationRepositoryInterface } from '@/application/contracts/notification-repository.interface'
import { prismaClient } from './prisma-client'

export class NotificationRepository implements SaveNotificationRepositoryInterface, GetNotificationByEmailRepositoryInterface {
  async save ({ id, email, sendAt }: SaveNotificationRepositoryInterface.Input): Promise<void> {
    await prismaClient.notifications.create({
      data: {
        id,
        email,
        sendAt
      }
    })
  }

  async getByEmail (email: string): Promise<string | undefined> {
    const notification = await prismaClient.notifications.findFirst({
      where: {
        email
      }
    })

    return notification?.email ?? undefined
  }
}

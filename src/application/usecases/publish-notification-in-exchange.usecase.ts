import { PublishNotificationInExchaneUseCaseInterface } from '@/application/contracts/publish-notification-in-exchange-usecase.interface'
import { QueueInterface } from '../contracts/queue-consume.interface'

export class PublishNotificationInExchaneUseCase implements PublishNotificationInExchaneUseCaseInterface {
  constructor (private readonly queue: QueueInterface) {}
  async execute ({ exchange, routingKey, message }: PublishNotificationInExchaneUseCaseInterface.Input): Promise<boolean> {
    return await this.queue.publish(exchange, routingKey, message)
  }
}

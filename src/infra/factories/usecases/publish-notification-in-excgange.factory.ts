import { PublishNotificationInExchaneUseCase } from '@/application/usecases/publish-notification-in-exchange.usecase'
import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import constants from '@/shared/constants'

export const makePublishNotificationInExchangeUseCase = (): PublishNotificationInExchaneUseCase => {
  const queue = new RabbitmqAdapter(constants.RABBIT_MQ_URI)
  return new PublishNotificationInExchaneUseCase(queue)
}

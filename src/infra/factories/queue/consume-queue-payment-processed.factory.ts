import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { ConsumeQueuePaymentProcessed } from '@/infra/queue/consume-queue-payment_processed'
import constants from '@/shared/constants'
import { makeUpdateStatusLeadUseCase } from '../usecases/update-status-lead.factory'

export const makeConsumeQueuePaymentsProcessed = (): ConsumeQueuePaymentProcessed => {
  const queue = new RabbitmqAdapter(constants.RABBIT_MQ_URI)
  const useCase = makeUpdateStatusLeadUseCase()
  return new ConsumeQueuePaymentProcessed(queue, useCase)
}

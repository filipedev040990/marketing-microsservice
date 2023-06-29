import { QueueInterface } from '@/application/contracts/queue-consume.interface'
import { UpdateStatusLeadUseCaseInterface } from '@/application/contracts/update-status-lead-usecase.interface'
import constants from '@/shared/constants'

export class ConsumeQueuePaymentProcessed {
  constructor (
    private readonly queue: QueueInterface,
    private readonly leadUseCase: UpdateStatusLeadUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    await this.queue.start()
    await this.queue.consume(constants.PAYMENT_PROCESSED_QUEUE, async (message: any) => {
      const response = JSON.parse(message.content.toString())
      if (response.status === constants.PAYMENT_APPROVED) {
        await this.leadUseCase.execute({
          identifier: response.client.identifier,
          status: constants.CLIENT_STATUS
        })
      }
    })
  }
}

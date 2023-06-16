import { mock } from 'jest-mock-extended'
import { ConsumeQueuePaymentProcessed } from './consume-queue-payment_processed'
import { QueueInterface } from '@/application/contracts/queue-consume.interface'
import { UpdateStatusLeadUseCaseInterface } from '@/application/contracts/update-status-lead-usecase.interface'

const queue = mock<QueueInterface>()
const leadUseCase = mock<UpdateStatusLeadUseCaseInterface>()

describe('ConsumeQueuePaymentProcessed', () => {
  let sut: ConsumeQueuePaymentProcessed

  beforeAll(() => {
    sut = new ConsumeQueuePaymentProcessed(queue, leadUseCase)
  })

  test('should call queue.start method', async () => {
    await sut.execute()

    expect(queue.start).toHaveBeenCalledTimes(1)
  })

  test('should call queue.consume method', async () => {
    await sut.execute()

    expect(queue.consume).toHaveBeenCalledTimes(1)
  })
})

import { mock } from 'jest-mock-extended'
import { PublishNotificationInExchaneUseCase } from './publish-notification-in-exchange.usecase'
import { QueueInterface } from '../contracts/queue-consume.interface'

const queue = mock<QueueInterface>()
const input = {
  exchange: 'anyExchange',
  routingKey: 'anyRoutingKey',
  message: 'anyMessage'
}

describe('PublishNotificationInExchaneUseCase', () => {
  let sut: PublishNotificationInExchaneUseCase

  beforeAll(() => {
    sut = new PublishNotificationInExchaneUseCase(queue)
  })
  test('should call queue.publish once and with correct values', async () => {
    await sut.execute(input)

    expect(queue.publish).toHaveBeenCalledTimes(1)
    expect(queue.publish).toHaveBeenCalledWith('anyExchange', 'anyRoutingKey', 'anyMessage')
  })
})

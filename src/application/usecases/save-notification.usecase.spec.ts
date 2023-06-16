import { SaveNotificationRepositoryInterface } from '../contracts/notification-repository.interface'
import { SaveNotificationUseCase } from './save-notification.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'

const notificationRepository = mock<SaveNotificationRepositoryInterface>()

describe('SaveNotificationUseCaseInterface', () => {
  let sut: SaveNotificationUseCase

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new SaveNotificationUseCase(notificationRepository)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call NotificationRepository.save once and with correct values', async () => {
    await sut.execute('anyEmail@email.com')

    expect(notificationRepository.save).toHaveBeenCalledTimes(1)
    expect(notificationRepository.save).toHaveBeenCalledWith({
      email: 'anyEmail@email.com',
      sendAt: new Date()
    })
  })
})

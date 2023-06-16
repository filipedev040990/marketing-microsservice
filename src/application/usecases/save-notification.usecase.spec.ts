import { SaveNotificationRepositoryInterface } from '../contracts/notification-repository.interface'
import { SaveNotificationUseCase } from './save-notification.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'
import { UUIDGeneratorInterface } from '../contracts/uuid-generator.interface'

const notificationRepository = mock<SaveNotificationRepositoryInterface>()
const uuidGenerator = mock<UUIDGeneratorInterface>()

describe('SaveNotificationUseCaseInterface', () => {
  let sut: SaveNotificationUseCase

  beforeAll(() => {
    MockDate.set(new Date())
    uuidGenerator.generate.mockReturnValue('anyUuid')
    sut = new SaveNotificationUseCase(notificationRepository, uuidGenerator)
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call NotificationRepository.save once and with correct values', async () => {
    await sut.execute('anyEmail@email.com')

    expect(notificationRepository.save).toHaveBeenCalledTimes(1)
    expect(notificationRepository.save).toHaveBeenCalledWith({
      id: 'anyUuid',
      email: 'anyEmail@email.com',
      sendAt: new Date()
    })
  })
})

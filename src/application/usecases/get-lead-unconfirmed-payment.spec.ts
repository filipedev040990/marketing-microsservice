import { GetLeadByStatusRepositoryInterface } from '../contracts/lead-repository.interface'
import { GetNotificationByEmailRepositoryInterface } from '../contracts/notification-repository.interface'
import { GetLeadUnconfirmedPaymentUseCase } from './get-lead-unconfirmed-payment'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const subtractDate = (days: number): Date => {
  return new Date(new Date().setDate(new Date().getDate() - days))
}

describe('GetLeadUnconfirmedPaymentUseCase', () => {
  const status: string = 'lead'
  const leadRepository = mock<GetLeadByStatusRepositoryInterface>()
  const notificationRepository = mock<GetNotificationByEmailRepositoryInterface>()
  let sut: GetLeadUnconfirmedPaymentUseCase

  beforeAll(() => {
    MockDate.set(new Date())
    sut = new GetLeadUnconfirmedPaymentUseCase(leadRepository, notificationRepository)

    leadRepository.getByStatus.mockResolvedValue([{
      id: 'anyId',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'client',
      phoneNumber: '32999521203',
      createdAt: subtractDate(20),
      updatedAt: subtractDate(20)
    },
    {
      id: 'anotherId',
      identifier: 'anotherIdentifier',
      name: 'anotherName',
      email: 'anotherEmail@email.com',
      document: 'anotherDocument',
      birthDate: new Date('2023-01-01'),
      status: 'lead',
      phoneNumber: '32999521203',
      createdAt: subtractDate(3),
      updatedAt: null
    },
    {
      id: 'fakeId',
      identifier: 'fakeIdentifier',
      name: 'fakeName',
      email: 'fakeEmail@email.com',
      document: 'fakeDocument',
      birthDate: new Date('2023-01-01'),
      status: 'lead',
      phoneNumber: '32999521203',
      createdAt: subtractDate(1),
      updatedAt: null
    },
    {
      id: 'superId',
      identifier: 'superIdentifier',
      name: 'superName',
      email: 'superEmail@email.com',
      document: 'superDocument',
      birthDate: new Date('2023-01-01'),
      status: 'lead',
      phoneNumber: '32999521203',
      createdAt: subtractDate(2),
      updatedAt: null
    }])
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LeadRepository.getByStatus', async () => {
    await sut.execute()

    expect(leadRepository.getByStatus).toHaveBeenCalledTimes(1)
    expect(leadRepository.getByStatus).toHaveBeenCalledWith(status)
  })

  test('should call NotificationRepository.getByEmail with correct values', async () => {
    leadRepository.getByStatus.mockResolvedValueOnce([{
      id: 'anyId',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'lead',
      phoneNumber: '32999521203',
      createdAt: subtractDate(2),
      updatedAt: null
    }])

    await sut.execute()

    expect(notificationRepository.getByEmail).toHaveBeenCalledTimes(1)
    expect(notificationRepository.getByEmail).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return an empty array if already sent notification to this email', async () => {
    notificationRepository.getByEmail.mockResolvedValueOnce('anyEmail@email.com')
    leadRepository.getByStatus.mockResolvedValueOnce([{
      id: 'anyId',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'lead',
      phoneNumber: '32999521203',
      createdAt: subtractDate(2),
      updatedAt: null
    }])

    const output = await sut.execute()

    expect(output).toEqual([])
  })

  test('should return only when createAt is greater than 48 hours and status is lead and not already notification sent', async () => {
    const output = await sut.execute()

    expect(output).toEqual([{
      name: 'anotherName',
      email: 'anotherEmail@email.com',
      status: 'lead',
      createdAt: subtractDate(3)
    },
    {
      name: 'superName',
      email: 'superEmail@email.com',
      status: 'lead',
      createdAt: subtractDate(2)
    }])
  })

  test('should return an empty array if all status is client', async () => {
    leadRepository.getByStatus.mockResolvedValueOnce([{
      id: 'anyId',
      identifier: 'anyIdentifier',
      name: 'anyName',
      email: 'anyEmail@email.com',
      document: 'anyDocument',
      birthDate: new Date('1990-01-01'),
      status: 'client',
      phoneNumber: '32999521203',
      createdAt: subtractDate(20),
      updatedAt: subtractDate(20)
    },
    {
      id: 'anotherId',
      identifier: 'anotherIdentifier',
      name: 'anotherName',
      email: 'anotherEmail@email.com',
      document: 'anotherDocument',
      birthDate: new Date('2023-01-01'),
      status: 'client',
      phoneNumber: '32999521203',
      createdAt: subtractDate(3),
      updatedAt: subtractDate(3)
    },
    {
      id: 'fakeId',
      identifier: 'fakeIdentifier',
      name: 'fakeName',
      email: 'fakeEmail@email.com',
      document: 'fakeDocument',
      birthDate: new Date('2023-01-01'),
      status: 'client',
      phoneNumber: '32999521203',
      createdAt: subtractDate(1),
      updatedAt: subtractDate(1)
    }])

    const output = await sut.execute()

    expect(output).toEqual([])
  })
})

import { UUIDGenerator } from './uuid-generator.adapter'

jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('anyUuid')
}))

describe('UUIDGenerator', () => {
  test('should return a uuid correctly', () => {
    const sut = new UUIDGenerator()
    const uuid = sut.generate()

    expect(uuid).toBe('anyUuid')
  })
})

import { UUIDGeneratorInterface } from '@/application/contracts/uuid-generator.interface'
import { randomUUID } from 'crypto'

export class UUIDGenerator implements UUIDGeneratorInterface {
  generate (): string {
    return randomUUID()
  }
}

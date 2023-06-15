import { SaveLeadRepositoryInterface } from '@/application/contracts/lead-repository.interface'
import { prismaClient } from './prisma-client'

export class LeadRepository implements SaveLeadRepositoryInterface {
  async save (input: SaveLeadRepositoryInterface.Input): Promise<void> {
    await prismaClient.lead.create({
      data: {
        id: input.id,
        name: input.name,
        email: input.email,
        birthDate: input.birthDate,
        phoneNumber: input.phoneNumber,
        status: input.status,
        createdAt: input.createdAt
      }
    })
  }
}

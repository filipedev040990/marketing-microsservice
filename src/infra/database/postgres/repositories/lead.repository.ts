import { SaveLeadRepositoryInterface, UpdateStatusLeadRepositoryInterface } from '@/application/contracts/lead-repository.interface'
import { prismaClient } from './prisma-client'

export class LeadRepository implements SaveLeadRepositoryInterface, UpdateStatusLeadRepositoryInterface {
  async save (input: SaveLeadRepositoryInterface.Input): Promise<SaveLeadRepositoryInterface.Output> {
    const lead = await prismaClient.lead.create({
      data: {
        id: input.id,
        identifier: input.identifier,
        name: input.name,
        email: input.email,
        document: input.document,
        birthDate: input.birthDate,
        phoneNumber: input.phoneNumber,
        status: input.status,
        createdAt: input.createdAt
      }
    })

    return {
      identifier: lead.identifier,
      name: lead.name,
      email: lead.email,
      document: lead.document,
      birthDate: lead.birthDate,
      phoneNumber: lead.phoneNumber,
      status: lead.status
    }
  }

  async update (input: UpdateStatusLeadRepositoryInterface.Input): Promise<void> {
    await prismaClient.lead.update({
      data: {
        status: input.status,
        updatedAt: input.updatedAt
      },
      where: { id: input.id }
    })
  }
}

export interface SaveLeadRepositoryInterface {
  save (input: SaveLeadRepositoryInterface.Input): Promise<void>
}

export namespace SaveLeadRepositoryInterface {
  export type Input = {
    id: string
    name: string
    email: string
    birthDate: Date
    status: string
    phoneNumber: string
    createdAt: Date
  }
}

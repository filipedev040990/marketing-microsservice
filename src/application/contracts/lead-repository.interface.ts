export interface SaveLeadRepositoryInterface {
  save (input: SaveLeadRepositoryInterface.Input): Promise<SaveLeadRepositoryInterface.Output>
}

export namespace SaveLeadRepositoryInterface {
  export type Input = {
    id: string
    identifier: string
    name: string
    email: string
    birthDate: Date
    status: string
    phoneNumber: string
    createdAt: Date
  }

  export type Output = {
    identifier: string
    name: string
    email: string
    document: string
    birthDate: Date
    status: string
    phoneNumber: string
  }
}

export interface SaveLeadUseCaseInterface {
  execute (input: SaveLeadUseCaseInterface.Input): Promise<SaveLeadUseCaseInterface.Output>
}

export namespace SaveLeadUseCaseInterface {
  export type Input = {
    name: string
    email: string
    birthDate: Date
    phoneNumber: string
  }

  export type Output = {
    name: string
    email: string
    birthDate: Date
    status: string
    phoneNumber: string
    createdAt: Date
    updatedAt: Date
  }
}

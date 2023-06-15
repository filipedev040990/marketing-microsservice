export interface SaveLeadUseCaseInterface {
  execute (input: SaveLeadUseCaseInterface.Input): Promise<SaveLeadUseCaseInterface.Output>
}

export namespace SaveLeadUseCaseInterface {
  export type Input = {
    name: string
    email: string
    document: string
    birthDate: Date
    phoneNumber: string
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

export interface SaveLeadUseCaseInterface {
  execute (input: SaveLeadUseCaseInterface.Input): Promise<void>
}

export namespace SaveLeadUseCaseInterface {
  export type Input = {
    name: string
    email: string
    birthDate: Date
    phoneNumber: string
  }
}

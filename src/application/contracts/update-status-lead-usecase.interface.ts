export interface UpdateStatusLeadUseCaseInterface {
  execute(input: UpdateStatusLeadUseCaseInterface.Input): Promise<void>
}

export namespace UpdateStatusLeadUseCaseInterface {
  export type Input = {
    identifier: string
    status: string
  }
}

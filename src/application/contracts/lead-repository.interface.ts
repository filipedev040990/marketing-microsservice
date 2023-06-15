export interface SaveLeadRepositoryInterface {
  save (input: SaveLeadRepositoryInterface.Input): Promise<SaveLeadRepositoryInterface.Output>
}

export namespace SaveLeadRepositoryInterface {
  export type Input = {
    id: string
    identifier: string
    name: string
    email: string
    document: string
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

export interface UpdateStatusLeadRepositoryInterface {
  update(input: UpdateStatusLeadRepositoryInterface.Input): Promise<void>
}

export namespace UpdateStatusLeadRepositoryInterface {
  export type Input = {
    id: string
    status: string
    updatedAt: Date
  }
}

export interface GetLeadByStatusRepositoryInterface {
  getByStatus(status: string): Promise<GetLeadByStatusRepositoryInterface.Output>
}

export namespace GetLeadByStatusRepositoryInterface {
  export type Output = {
    identifier: string
    name: string
    email: string
    document: string
    birthDate: Date
    status: string
    phoneNumber: string
  } | undefined
}

export interface SaveLeadRepositoryInterface {
  save (input: SaveLeadRepositoryInterface.Props): Promise<SaveLeadRepositoryInterface.Props>
}

export namespace SaveLeadRepositoryInterface {
  export type Props = {
    id: string
    name: string
    email: string
    birthDate: Date
    status: string
    phoneNumber: string
    createdAt: Date
  }
}

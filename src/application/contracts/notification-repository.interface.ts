export interface GetNotificationByEmailRepositoryInterface {
  getByEmail (email: string): Promise<string | undefined>
}

export interface SaveNotificationRepositoryInterface {
  save(input: SaveNotificationRepositoryInterface.Input): Promise<void>
}

export namespace SaveNotificationRepositoryInterface {
  export type Input = {
    id: string
    email: string
    sendAt: Date
  }
}

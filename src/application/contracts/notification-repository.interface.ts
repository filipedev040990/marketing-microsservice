export interface GetNotificationByEmailRepositoryInterface {
  getByEmail (email: string): Promise<string>
}

export interface SaveNotificationRepositoryInterface {
  save(input: SaveNotificationRepositoryInterface.Input): Promise<void>
}

export namespace SaveNotificationRepositoryInterface {
  export type Input = {
    email: string
    sendAt: Date
  }
}

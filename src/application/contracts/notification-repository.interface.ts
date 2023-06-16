export interface GetNotificationByEmailRepository {
  getByEmail (email: string): Promise<string>
}

export interface SaveNotificationRepository {
  save(input: SaveNotificationRepository.Input): Promise<void>
}

export namespace SaveNotificationRepository {
  export type Input = {
    email: string
    sendAt: Date
  }
}

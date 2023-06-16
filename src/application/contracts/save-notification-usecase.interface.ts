export interface SaveNotificationUseCaseInterface {
  execute(email: string): Promise<void>
}

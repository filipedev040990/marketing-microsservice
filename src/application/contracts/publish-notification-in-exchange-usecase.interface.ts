export interface PublishNotificationInExchaneUseCaseInterface {
  execute(input: PublishNotificationInExchaneUseCaseInterface.Input): Promise<boolean>
}

export namespace PublishNotificationInExchaneUseCaseInterface {
  export type Input = {
    exchange: string
    routingKey: string
    message: any
  }
}

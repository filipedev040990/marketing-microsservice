export interface GetLeadUnconfirmedPaymentUseCaseInterface {
  execute(): Promise<GetLeadUnconfirmedPaymentUseCaseInterface.Output[] | []>
}

export namespace GetLeadUnconfirmedPaymentUseCaseInterface {
  export type Output = {
    name: string
    email: string
    status: string
    createdAt: Date
  }
}

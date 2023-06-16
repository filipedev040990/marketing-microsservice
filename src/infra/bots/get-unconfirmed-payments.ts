import { GetLeadUnconfirmedPaymentUseCaseInterface } from '@/application/contracts/get-lead-unconfirmed-payment-usecase.interface'

export class GetUnconfirmedPayments {
  constructor (private readonly getLeadUnconfirmedPaymentUseCase: GetLeadUnconfirmedPaymentUseCaseInterface) {}
  async execute (): Promise<void> {
    await this.getLeadUnconfirmedPaymentUseCase.execute()
  }
}

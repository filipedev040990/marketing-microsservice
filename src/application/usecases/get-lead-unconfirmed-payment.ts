import constants from '@/shared/constants'
import { GetLeadUnconfirmedPaymentUseCaseInterface } from '../contracts/get-lead-unconfirmed-payment-usecase.interface'
import { GetLeadByStatusRepositoryInterface } from '../contracts/lead-repository.interface'

export class GetLeadUnconfirmedPaymentUseCase implements GetLeadUnconfirmedPaymentUseCaseInterface {
  constructor (private readonly repository: GetLeadByStatusRepositoryInterface) {}
  async execute (): Promise<GetLeadUnconfirmedPaymentUseCaseInterface.Output> {
    await this.repository.getByStatus(constants.leadStatus)
    return undefined
  }
}

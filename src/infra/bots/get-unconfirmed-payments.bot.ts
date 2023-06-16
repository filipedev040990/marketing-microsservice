import schedule from 'node-schedule'
import { GetUnconfirmedPaymentsJob } from '@/infra/jobs/get-unconfirmed-payments.job'
import { makeGetLeadsUnconfirmedPayments } from '../factories/usecases/get-leads-unconfirmed-payment.factory'
import { makePublishNotificationInExchangeUseCase } from '../factories/usecases/publish-notification-in-excgange.factory'

const getUnconfirmedPaymentsBot = (): void => {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const getLeadsUnconfirmedPaymentsuseCase = makeGetLeadsUnconfirmedPayments()
    const publishNotificationUseCase = makePublishNotificationInExchangeUseCase()
    const job = new GetUnconfirmedPaymentsJob(getLeadsUnconfirmedPaymentsuseCase, publishNotificationUseCase)
    await job.execute()
  })
}

export { getUnconfirmedPaymentsBot }

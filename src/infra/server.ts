import 'module-alias/register'
import { app } from './app'
import { makeConsumeQueuePaymentsProcessed } from './factories/queue/consume-queue-payment-processed.factory'
import { getUnconfirmedPaymentsBot } from './bots/get-unconfirmed-payments.bot'

const start = async (): Promise<void> => {
  try {
    const port = process.env.PORT ?? 3000
    app.listen(port, () => console.log(`Server running at port ${port}`))

    getUnconfirmedPaymentsBot()

    const consumeQueuePaymentProcessed = makeConsumeQueuePaymentsProcessed()
    await consumeQueuePaymentProcessed.execute()
  } catch (error) {
    console.log(error)
  }
}

void start()

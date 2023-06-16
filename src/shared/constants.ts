export default {
  LEAD_STATUS: 'lead',
  CLIENT_STATUS: 'client',
  DAYS_UNCONFIRMED_PAYMENT_TO_SEND_NOTIFICATION: 2,
  PAYMENT_PROCESSED_QUEUE: 'payment_processed',
  PAYMENT_APPROVED: 'approved',
  PAYMENT_REFUSED: 'refused',
  UNCONFIRMED_PAYMENT_NOTIFICATION_SUBJECT: 'Inscrição não concluída',
  SUPPORT_EMAIL: 'suporte@email.com.br',
  QUEUE_EXCHANGE_SEND_NOTIFICATION: 'send_notification',
  QUEUE_EXCHANGE_SEND_NOTIFICATION_ROUNTING_KEY: 'unconfirmed_payments',
  RABBIT_MQ_URI: 'amqp://admin:admin@rabbitmq:5672'
}

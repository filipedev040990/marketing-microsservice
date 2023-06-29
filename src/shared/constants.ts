export default {
  LEAD_STATUS: 'lead',
  CLIENT_STATUS: 'client',
  DAYS_UNCONFIRMED_PAYMENT_TO_SEND_NOTIFICATION: 2,
  PAYMENT_PROCESSED_QUEUE: 'marketing_payment_processed',
  PAYMENT_APPROVED: 'approved',
  PAYMENT_REFUSED: 'refused',
  UNCONFIRMED_PAYMENT_NOTIFICATION_SUBJECT: 'Inscrição não concluída',
  SUPPORT_EMAIL: 'suporte@email.com.br',
  QUEUE_EXCHANGE_NOTIFICATION: 'payments',
  UNCONFIRMED_PAYMENT_ROUTING_KEY: 'notify_unconfirmed_payment',
  RABBIT_MQ_URI: 'amqp://admin:admin@rabbitmq:5672'
}

# Envia notificação para leads que não confirmaram pagamento nas ultimas 24 horas

> ## Caso de sucesso

1. ✅ Se houver leads nessa situação, deve publicar uma mensagem na fila send_notification


## Objeto a ser enviado pra fila
{
  	"subject": "Inscrição não concluída",
    "to": "email-do-lead-aqui",
    "body": "Olá, {nome-do-lead} tudo bem? Observamos que você não concluiu sua matricula em nossa plataforma. Para ajuda, contacte nosso suporte pelo email suporte@email.com.br"
}

✅
⛔
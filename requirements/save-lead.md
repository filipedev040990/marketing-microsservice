# Cadastrar um novo lead

> ## Caso de sucesso

1. ✅ Salva os dados do lead
2. ✅ Retorna status 201

> ## Exceções
1. ✅ Retorna 400 se o nome do lead não for fornecido
1. ✅ Retorna 400 se o email do lead não for fornecido
1. ✅ Retorna 400 se a data de nascimento do lead não for fornecido
1. ✅ Retorna 400 se numero de telefone do lead não for fornecido
2. ✅ Retorna 500 se houver alguma falha ao salvar os dados


## Objeto Lead
{
    id: string
    name: string
    email: string
    birthDate: Date
    status: string (customer | lead)
    phoneNumber: string
    createdAt: Date
    updatedAt?: Date
}

✅
⛔
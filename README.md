# Cadastro de Imoveis

******************************************************************************************************************************************
Feito em typescript + libs, que são:
******************************************************************************************************************************************
-Express para backend
-JWT para gerar token
-typeorm pra criar entidades e salvar usuário e endereço no banco
-bcrypt pra encriptar senhas
#Para rodar o projeto basta digitar os comandos:

npm run typeorm migration:run
npm run dev

******************************************************************************************************************************************
#Endpoints
******************************************************************************************************************************************
#CRUD de usuário:

#Cadastro (create), rota post /user
******************************************************************************************************************************************
  Digita os dados pedidos:

{
	"nome": "Diego",
	"cpf": 12121212188,
	"email": "abujafar@iaaiejj",
	"senha": "12345"
}
******************************************************************************************************************************************
endpoint:

e Recebe esse endpoint:
{
  "user": {
    "nome": "Diego",
    "cpf": 12121212188,
    "email": "abujafar@iaaiejj",
    "senha": "$2a$08$UYDRU1Kwl4tQ6c.Urt/G3OEa2sLB1h/fEedFyusAnEQsrv8Xvg1TG",
    "id": "3208fb5d-7d88-4051-8f3f-e5192d854916",
    "created_at": "2021-06-07T05:12:44.593Z",
    "updated_at": "2021-06-07T05:12:44.593Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjMwNDI3NjQsImV4c
  CI6MTYyMzEyOTE2NH0.f60soNKB-1qM39d4QPuWPq-7rdEgn1RfE0i30jydRF0"
}

******************************************************************************************************************************************
  #Listagem de todos os usuários (Read), rota get /user
******************************************************************************************************************************************
  endpoint:
  
  [
  {
    "id": "3208fb5d-7d88-4051-8f3f-e5192d854916",
    "nome": "Diego",
    "cpf": "12121212188",
    "email": "diego@.com.br",
    "senha": "$2a$08$UYDRU1Kwl4tQ6c.Urt/G3OEa2sLB1h/fEedFyusAnEQsrv8Xvg1TG",
    "created_at": "2021-06-07T05:12:44.593Z",
    "updated_at": "2021-06-07T06:06:48.494Z"
  }
]

******************************************************************************************************************************************
  #Listagem de um usuário apenas (Read/:id), rota get /user/:id
******************************************************************************************************************************************

endpoint:(Obs:. Necessário passar o id como parâmetro)

{
  "id": "3208fb5d-7d88-4051-8f3f-e5192d854916",
  "nome": "Diego",
  "cpf": "12121212188",
  "email": "diego@.com.br",
  "senha": "$2a$08$UYDRU1Kwl4tQ6c.Urt/G3OEa2sLB1h/fEedFyusAnEQsrv8Xvg1TG",
  "created_at": "2021-06-07T05:12:44.593Z",
  "updated_at": "2021-06-07T06:06:48.494Z"
}

******************************************************************************************************************************************
  #Atualização de usuário (Update/:id), rota put /user/:id
******************************************************************************************************************************************
  endpoints:(É passado também umm id como parâmetro)
  
   Você escolhe o campo que vai editar e edita:
   
    {
	    "email": "diego@.com.br"
    }
******************************************************************************************************************************************
    Depois recebe a mensagem de sucesso ou falha ( Como exemplo, coloquei a de sucesso):
    
    {
      "message": "Usuario atualizado"
    }
   
******************************************************************************************************************************************
   #Deleção de usuário (Delete/:id), rota delete /user/:id
******************************************************************************************************************************************
  endpoints:(É passado também umm id como parâmetro)
  
    {
     "message": "Usuario excluido!"
    }
******************************************************************************************************************************************
  #Login (Create) rota post /session
******************************************************************************************************************************************
  Você loga com email e senha:
  
      {
	      "email": "abujafar@iaaiejj",
	      "senha": "12345"
      }
******************************************************************************************************************************************
      e recebe mensagem de sucesso ou falha (no exemplo, foi a de sucesso)
      
    {
       "user":{
    "id": "3208fb5d-7d88-4051-8f3f-e5192d854916",
    "nome": "Diego",
    "cpf": "12121212188",
    "email": "abujafar@iaaiejj",
    "created_at": "2021-06-07T05:12:44.593Z",
    "updated_at": "2021-06-07T05:12:44.593Z"
        },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMDhmYjVkLTdkODgtNDA1MS04ZjNmLWU
  1MTkyZDg1NDkxNiIsImlhdCI6MTYyMzA0Mjc4NywiZXhwIjoxNjIzMTI5MTg3fQ._aN4JYLpn4b-SPlxN2oBt4EmzzfZZ9zilM4GRsrteqs",
  "message": "Logado"
      }
      
******************************************************************************************************************************************
    #Verificar token (Read+Bearer) get /session/+BearerToken
******************************************************************************************************************************************
    Você pega o token do login, e o valida com o Bearer token
    
    endpoint:
    
      {
        "message": "Usuario verificado! Por favor, adicione imoveis"
      }
      
******************************************************************************************************************************************

#Observações:

#o CRUD  de imóveis funciona da mesma forma(com excessão da verificação do token pelo bearer, e o login), exceto esses endpoints:

******************************************************************************************************************************************

#1 - Primeiro você cadastra o imóvel, e no campo "user" você coloca o id do usuário referente àquele imóvel.
******************************************************************************************************************************************
  Adicionar imóvel (Create), rota post /imoveis

{
	"cep": 40760373,
"numero": 121,
"complemento": "taltaltlatlalta",
"aluguel": 320.50,
"quartos": 2,
"imovel": true,
	"user": "3208fb5d-7d88-4051-8f3f-e5192d854916"
}
******************************************************************************************************************************************
#1.1 - Depois recebe a mensagem de sucesso ou falha (no exemplo, sucesso novamente)
******************************************************************************************************************************************
  {
  "imoveis": {
    "cep": 40760373,
    "numero": 121,
    "complemento": "taltaltlatlalta",
    "aluguel": 320.5,
    "quartos": 2,
    "imovel": true,
    "user": "3208fb5d-7d88-4051-8f3f-e5192d854916",
    "id": "c4b9eea5-e981-4237-9a20-f1ed03307a3a",
    "created_at": "2021-06-07T05:14:02.317Z",
    "updated_at": "2021-06-07T05:14:02.317Z"
  },
  "message": "Imovel adicionado"
  }
  
******************************************************************************************************************************************
 #2- Listar imóveis com usuários (Read), rota get /imoveis
    
    endpoint:
 [
  {
    "id": "c4b9eea5-e981-4237-9a20-f1ed03307a3a",
    "cep": 40760373,
    "numero": 121,
    "complemento": "taltaltlatlalta",
    "aluguel": "320.50",
    "quartos": 2,
    "imovel": true,
    "created_at": "2021-06-07T05:14:02.317Z",
    "updated_at": "2021-06-07T05:14:02.317Z",
    "user": {
      "id": "3208fb5d-7d88-4051-8f3f-e5192d854916",
      "nome": "Diego",
      "cpf": "12121212188",
      "email": "abujafar@iaaiejj",
      "senha": "$2a$08$UYDRU1Kwl4tQ6c.Urt/G3OEa2sLB1h/fEedFyusAnEQsrv8Xvg1TG",
      "created_at": "2021-06-07T05:12:44.593Z",
      "updated_at": "2021-06-07T05:12:44.593Z"
    }
  }
]
******************************************************************************************************************************************

   

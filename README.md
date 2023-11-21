**README**

**Backend - Desafio Técnico 2 - ESCRIBO**

**Objetivo:**

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário.

**Instalação**

Para instalar a API, execute os seguintes comandos:

```
npm install
```

**Configuração**

Para configurar a API, edite o arquivo `.env` e defina as seguintes variáveis de ambiente:

* `PORT`: Porta utilizada pela aplicação.
* `SECRET`: Secret utilizado para gerar o token JWT.
* `DATABASE_URL`: Conexão com o banco de dados Postgres.

**Execução**

Para executar a API, execute o seguinte comando:

```
npm run start
```

**Swagger**

A API está documentada usando o Swagger. Você pode acessar a documentação da API abrindo o seguinte URL no navegador:

```
http://localhost:5000/swagger
```

**Testes**

A API inclui testes unitários que podem ser executados com o seguinte comando:

```
npm run test
```

**Exemplos de uso**

Aqui estão alguns exemplos de como usar a API:

* Para realizar o login, execute a seguinte consulta:

```
GET http://localhost:5000/auth
```
O corpo da solicitação deve conter os seguintes dados:

```
{
  "email": "teste@teste.com",
  "senha": "teste"
}
```

* Para listar todos os usuários, execute a seguinte consulta:

```
GET http://localhost:5000/users
```

* Para criar um novo usuário, execute a seguinte consulta:

```
POST http://localhost:5000/users
```

O corpo da solicitação deve conter os seguintes dados:

```
{
  "nome": "John Doe",
  "email": "johndoe@example.com",
  "senha": "password123"
}
```

* Para atualizar um usuário, execute a seguinte consulta:

```
PUT http://localhost:5000/users/{user_id}
```

O corpo da solicitação deve conter os dados que você deseja atualizar.

* Para excluir um usuário, execute a seguinte consulta:

```
DELETE http://localhost:5000/users/{user_id}
```

**Tecnologias utilizadas**

A API utiliza as seguintes tecnologias:

* **Express** 
* **Postgres**
* **Prisma ORM**
* **Swagger**
* **Testes unitários com Jest**
<h1>Backend - Desafio Técnico 2 - ESCRIBO</h1>

<h2>Objetivo:</h2>

Desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up),
autenticação (sign in) e recuperação de informações do usuário.

<h2>Instalação</h2>

Para instalar a API, execute os seguintes comandos:

```
npm install
```

<h2>Configuração</h2>

Para configurar a API, edite o arquivo `.env` e defina as seguintes variáveis de ambiente:

* `PORT`: Porta utilizada pela aplicação.
* `SECRET`: Secret utilizado para gerar o token JWT.
* `DATABASE_URL`: Conexão com o banco de dados Postgres.

<h2>Execução</h2>

Para executar a API, execute o seguinte comando:

```
npm run start
```

<h2>Swagger</h2>

A API está documentada usando o Swagger. Você pode acessar a documentação da API abrindo o seguinte URL no navegador:

```
https://crud-usuarios.raffp.dev/swagger ou http://localhost:5000/swagger
```

<h2>Testes</h2>

A API inclui testes unitários que podem ser executados com o seguinte comando:

```
npm run test
```

<h2>Exemplos de uso</h2>

Aqui estão alguns exemplos de como usar a API:

* Para realizar o login, execute a seguinte consulta:

```
POST https://crud-usuarios.raffp.dev/auth ou http://localhost:5000/auth
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
GET https://crud-usuarios.raffp.dev/users ou http://localhost:5000/users
```

* Para criar um novo usuário, execute a seguinte consulta:

```
POST https://crud-usuarios.raffp.dev/users ou http://localhost:5000/users
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
PUT https://crud-usuarios.raffp.dev/users/{user_id} ou http://localhost:5000/users/{user_id}
```

O corpo da solicitação deve conter os dados que você deseja atualizar.

* Para excluir um usuário, execute a seguinte consulta:

```
DELETE https://crud-usuarios.raffp.dev/users/{user_id} ou http://localhost:5000/users/{user_id}
```

<h2>Tecnologias utilizadas</h2>

A API utiliza as seguintes tecnologias:

* **Express** 
* **Postgres**
* **Prisma ORM**
* **Swagger**
* **Testes unitários com Jest**

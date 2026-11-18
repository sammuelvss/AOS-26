# AOS-26 — API RESTful de Gerenciamento de Tarefas (`express-01`)

Aplicações Orientadas a Serviços (UNICAP). API RESTful construída com **Node.js**, **Express 5**, **Sequelize** (**NeonDB / PostgreSQL**) e **Zod**, preparada para deploy Serverless na **Vercel**.

## Estrutura do Projeto

```
express-01/
├── src/
│   ├── controllers/
│   │   ├── index.js
│   │   ├── messageController.js
│   │   ├── tarefaController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── cors.js
│   │   ├── error.js
│   │   ├── index.js
│   │   ├── rateLimiter.js
│   │   ├── validate.js
│   │   └── validationSchemas.js
│   ├── models/
│   │   ├── index.js
│   │   ├── message.js
│   │   ├── tarefa.js
│   │   └── user.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── message.js
│   │   ├── tarefa.js
│   │   └── user.js
│   ├── services/
│   │   ├── index.js
│   │   ├── messageService.js
│   │   ├── tarefaService.js
│   │   └── userService.js
│   ├── utils/
│   │   ├── appError.js
│   │   ├── env.js
│   │   └── index.js
│   └── index.js
├── .env.sample
├── package.json
├── postman_collection.json
└── vercel.json
```

## Configuração Local

1. Entre na pasta `express-01` e instale as dependências:
   ```bash
   cd express-01
   npm install
   ```
2. Crie o arquivo `.env` a partir de `.env.sample` e configure `DATABASE_URL` com a string de conexão do NeonDB.
3. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Endpoints de Tarefas (`/tarefas`)

| Método | Rota | Descrição | Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/tarefas` | Cria uma nova tarefa (`descricao` obrigatória, `concluida` opcional padrão `false`) | `201 Created` |
| `GET` | `/tarefas` | Lista todas as tarefas cadastradas | `200 OK` |
| `GET` | `/tarefas/:objectId` | Busca uma tarefa pelo `objectId` (UUID) | `200 OK` / `404` |
| `PUT` | `/tarefas/:objectId` | Atualiza `descricao` e/ou `concluida` de uma tarefa | `200 OK` / `404` |
| `DELETE` | `/tarefas/:objectId` | Remove uma tarefa pelo `objectId` (UUID) | `200 OK` / `404` |

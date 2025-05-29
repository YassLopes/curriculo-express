# API de Currículo

API REST construída com Express e PostgreSQL para gerenciar dados de currículo. Esta API permite armazenar e gerenciar informações de usuários, educação, experiência profissional e habilidades.

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- express-validator
- cors
- helmet
- morgan
- dotenv

## Requisitos

- Node.js (v14+)
- PostgreSQL

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgres://usuario:senha@localhost:5432/curriculo_db
   ```
4. Crie o banco de dados PostgreSQL:
   ```
   createdb curriculo_db
   ```
5. Execute o script SQL para criar as tabelas:
   ```
   psql curriculo_db < src/db/init.sql
   ```

## Inicialização

Para iniciar o servidor de desenvolvimento:
```
npm run dev
```

Para iniciar o servidor em produção:
```
npm start
```

## Endpoints

### Usuários
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Obter usuário por ID
- `POST /api/users` - Criar novo usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Excluir usuário

### Educação
- `GET /api/education` - Listar todos os registros de educação
- `GET /api/education/:id` - Obter educação por ID
- `GET /api/education/user/:userId` - Listar educação por usuário
- `POST /api/education` - Criar novo registro de educação
- `PUT /api/education/:id` - Atualizar registro de educação
- `DELETE /api/education/:id` - Excluir registro de educação

### Experiência
- `GET /api/experience` - Listar todas as experiências
- `GET /api/experience/:id` - Obter experiência por ID
- `GET /api/experience/user/:userId` - Listar experiências por usuário
- `POST /api/experience` - Criar nova experiência
- `PUT /api/experience/:id` - Atualizar experiência
- `DELETE /api/experience/:id` - Excluir experiência

### Habilidades
- `GET /api/skills` - Listar todas as habilidades
- `GET /api/skills/:id` - Obter habilidade por ID
- `GET /api/skills/user/:userId` - Listar habilidades por usuário
- `POST /api/skills` - Criar nova habilidade
- `PUT /api/skills/:id` - Atualizar habilidade
- `DELETE /api/skills/:id` - Excluir habilidade

## Implantação no Vercel

Para implantar esta API no Vercel:

1. Crie uma conta no Vercel
2. Instale a CLI do Vercel:
   ```
   npm i -g vercel
   ```
3. Faça login na CLI:
   ```
   vercel login
   ```
4. Adicione um arquivo `vercel.json` na raiz do projeto:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/index.js"
       }
     ]
   }
   ```
5. Implante o projeto:
   ```
   vercel
   ```

## Licença

ISC

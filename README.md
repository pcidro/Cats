# 🐱 Cats — Backend

<div align="center">

**API REST da rede social Cats**

Backend de uma rede social onde usuários podem criar perfis para seus gatos, publicar fotos, curtir, comentar e explorar publicações da comunidade.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge\&logo=prisma\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge\&logo=postgresql\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=jsonwebtokens\&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge\&logo=zod\&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge\&logo=cloudinary\&logoColor=white)

</div>

---

## 📖 Sobre o projeto

Este repositório contém o **backend da Cats**, uma rede social desenvolvida para pessoas apaixonadas por gatos.

A aplicação permite que usuários criem suas contas, cadastrem seus gatos, publiquem fotos, interajam com outras publicações através de curtidas e comentários e explorem o conteúdo da comunidade.

O backend foi desenvolvido como uma **API REST com Node.js, Express e TypeScript**, utilizando uma arquitetura organizada em **rotas, controllers e services**.

O banco de dados utiliza **PostgreSQL** com **Prisma ORM**, enquanto autenticação, validação e armazenamento de imagens são realizados com **JWT**, **Zod** e **Cloudinary**.

O frontend foi desenvolvido separadamente utilizando **Next.js, React, TypeScript e Tailwind CSS**.

### 🔗 Links

* **Frontend:** https://github.com/pcidro/Cats-Front
* **Backend:** https://github.com/pcidro/Cats
* **Aplicação:** https://cats-topaz.vercel.app/

---

## ✨ Funcionalidades

### 👤 Usuários

* ✅ Cadastro de usuário
* ✅ Login com autenticação JWT
* ✅ Recuperação do usuário autenticado
* ✅ Perfil público de usuários
* ✅ Atualização de perfil
* ✅ Exclusão de conta

### 🐱 Gatos

* ✅ Cadastro de gatos
* ✅ Listagem dos gatos do usuário autenticado
* ✅ Listagem de gatos de outros usuários
* ✅ Visualização de gato por ID
* ✅ Atualização de informações
* ✅ Exclusão de gatos
* ✅ Upload de imagens

### 📸 Publicações

* ✅ Criação de posts vinculados a um gato
* ✅ Feed de publicações
* ✅ Atualização de posts
* ✅ Exclusão de posts
* ✅ Upload de imagens através do Cloudinary

### ❤️ Interações

* ✅ Curtir posts
* ✅ Descurtir posts
* ✅ Visualizar comentários
* ✅ Criar comentários
* ✅ Editar comentários
* ✅ Excluir comentários

### 🔐 Segurança e validação

* ✅ Autenticação através de JWT
* ✅ Proteção de rotas privadas
* ✅ Validação de dados com Zod
* ✅ Tratamento global de erros
* ✅ Erros customizados com `AppError`

---

## 🛠️ Tech Stack

| Tecnologia                                    | Uso                                       |
| --------------------------------------------- | ----------------------------------------- |
| [Node.js](https://nodejs.org/)                | Runtime JavaScript                        |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática                          |
| [Express](https://expressjs.com/)             | Framework HTTP                            |
| [Prisma](https://www.prisma.io/)              | ORM                                       |
| [PostgreSQL](https://www.postgresql.org/)     | Banco de dados relacional                 |
| [Zod](https://zod.dev/)                       | Validação de dados                        |
| [JWT](https://jwt.io/)                        | Autenticação                              |
| [Cloudinary](https://cloudinary.com/)         | Armazenamento de imagens                  |
| [Multer](https://github.com/expressjs/multer) | Processamento de uploads                  |
| [tsx](https://github.com/privatenumber/tsx)   | Execução de TypeScript em desenvolvimento |

---

## 🏗️ Arquitetura

A API foi organizada separando responsabilidades entre diferentes camadas:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Service
  ↓
Prisma
  ↓
PostgreSQL
```

### Routes

Responsáveis pela definição dos endpoints da API e associação com seus respectivos controllers e middlewares.

### Controllers

Recebem as requisições HTTP, extraem os dados necessários e chamam os services responsáveis pela lógica da aplicação.

### Services

Contêm as regras de negócio e realizam operações no banco de dados através do Prisma.

### Middlewares

Responsáveis por tarefas como:

* autenticação;
* validação;
* upload de arquivos;
* tratamento de erros.

### Prisma

Responsável pela comunicação entre a aplicação e o banco PostgreSQL.

---

## 📁 Estrutura do projeto

```text
backend/
├── docs/
│   ├── architecture.md
│   ├── database.md
│   └── api.md
│
├── generated/
│   └── prisma/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   │
│   ├── errors/
│   │   └── AppError.ts
│   │
│   ├── lib/
│   │   └── prisma.ts
│   │
│   ├── middlewares/
│   │
│   ├── routes/
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   ├── cat.routes.ts
│   │   ├── post.routes.ts
│   │   └── comment.routes.ts
│   │
│   ├── schemas/
│   │
│   ├── services/
│   │
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

Antes de começar, tenha instalado:

* [Node.js](https://nodejs.org/) 18+
* [PostgreSQL](https://www.postgresql.org/)

Também é necessário possuir uma conta no [Cloudinary](https://cloudinary.com/) para utilizar o upload de imagens.

---

### 1. Clone o repositório

```bash
git clone https://github.com/pcidro/Cats.git
cd Cats
```

---

### 2. Instale as dependências

```bash
npm install
```

---

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto.

Exemplo:

```env
PORT=3333

DATABASE_URL="postgresql://usuario:senha@host:5432/database"

JWT_SECRET="sua_chave_secreta"

CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
```

> Nunca envie seu arquivo `.env` para o GitHub.

---

### 4. Configure o Prisma

Gere o Prisma Client:

```bash
npx prisma generate
```

Execute as migrations:

```bash
npx prisma migrate dev
```

---

### 5. Inicie a aplicação

```bash
npm run dev
```

O servidor estará disponível em:

```text
http://localhost:3333
```

---

## 🔌 Principais endpoints

### Autenticação e usuários

| Método   | Endpoint                       | Descrição                 |
| -------- | ------------------------------ | ------------------------- |
| `POST`   | `/api/users`                   | Criar usuário             |
| `POST`   | `/api/auth`                    | Realizar login            |
| `GET`    | `/api/me`                      | Usuário autenticado       |
| `GET`    | `/api/users/profile/:username` | Visualizar perfil público |
| `PUT`    | `/api/users/update`            | Atualizar perfil          |
| `DELETE` | `/api/users/delete`            | Excluir conta             |

### Gatos

| Método   | Endpoint                  | Descrição                  |
| -------- | ------------------------- | -------------------------- |
| `POST`   | `/api/cat`                | Cadastrar gato             |
| `GET`    | `/api/cats/me`            | Listar próprios gatos      |
| `GET`    | `/api/users/:userId/cats` | Listar gatos de um usuário |
| `GET`    | `/api/cat/:id`            | Buscar gato                |
| `PUT`    | `/api/cat/:id`            | Atualizar gato             |
| `DELETE` | `/api/cat/:id`            | Excluir gato               |

### Posts

| Método   | Endpoint            | Descrição            |
| -------- | ------------------- | -------------------- |
| `GET`    | `/api/posts`        | Feed de publicações  |
| `POST`   | `/api/post/:cat_id` | Criar publicação     |
| `PUT`    | `/api/post/:id`     | Atualizar publicação |
| `DELETE` | `/api/post/:id`     | Excluir publicação   |

### Curtidas

| Método | Endpoint             | Descrição                      |
| ------ | -------------------- | ------------------------------ |
| `POST` | `/api/like/:post_id` | Curtir ou descurtir publicação |

### Comentários

| Método   | Endpoint                 | Descrição            |
| -------- | ------------------------ | -------------------- |
| `GET`    | `/api/comments/:post_id` | Listar comentários   |
| `POST`   | `/api/comment/:post_id`  | Criar comentário     |
| `PUT`    | `/api/comment/:id`       | Atualizar comentário |
| `DELETE` | `/api/comment/:id`       | Excluir comentário   |

---

## 📜 Scripts

| Script        | Descrição                                    |
| ------------- | -------------------------------------------- |
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |

---

## 📚 Documentação

Informações adicionais sobre arquitetura, banco de dados e endpoints estão disponíveis na pasta [`docs`](./docs/).

* [`architecture.md`](./docs/architecture.md) — Arquitetura da aplicação
* [`database.md`](./docs/database.md) — Modelagem e relacionamentos do banco
* [`api.md`](./docs/api.md) — Documentação da API

---

## 🎯 Principais aprendizados

O desenvolvimento da Cats envolveu a construção de uma aplicação full stack completa e permitiu colocar em prática conceitos como:

* desenvolvimento de APIs REST;
* arquitetura em controllers e services;
* autenticação utilizando JWT;
* proteção de rotas privadas;
* validação de dados com Zod;
* modelagem de banco de dados relacional;
* utilização do Prisma ORM;
* relacionamento entre usuários, gatos, posts, curtidas e comentários;
* upload e armazenamento de imagens com Cloudinary;
* integração entre frontend, API e banco de dados;
* tratamento e padronização de erros.

---

## 💻 Frontend

O frontend da aplicação foi desenvolvido separadamente utilizando:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn UI

Repositório:

https://github.com/pcidro/Cats-Front

Aplicação:

https://cats-topaz.vercel.app/

---


# 🐱 Cats — Backend

<div align="center">

**API da rede social para gatos**

Uma rede social onde donos podem cadastrar seus gatinhos e compartilhar fotos com a comunidade.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

---

## 📖 Sobre

Este é o **backend** da rede social **Cats**. Uma API REST construída com Express e TypeScript que fornece todos os endpoints necessários para o funcionamento da plataforma.

O frontend está sendo desenvolvido separadamente com **Next.js**, **TypeScript**, **Tailwind CSS** e **shadcn/ui**.

---

## ✨ Funcionalidades

| Status | Funcionalidade                                    |
| :----: | ------------------------------------------------- |
|   ✅   | Estrutura do servidor Express                     |
|   ✅   | Modelagem do banco de dados (Prisma + PostgreSQL) |
|   ✅   | Health check da API                               |
|   📋   | Autenticação (cadastro e login)                   |
|   📋   | CRUD de usuários                                  |
|   📋   | CRUD de gatos                                     |
|   📋   | Upload de imagens                                 |
|   📋   | Feed de fotos                                     |
|   📋   | Sistema de curtidas                               |
|   📋   | Sistema de comentários                            |

> ✅ Concluído &nbsp; 🚧 Em progresso &nbsp; 📋 Planejado

---

## 🛠️ Tech Stack

| Tecnologia                                    | Uso                           |
| --------------------------------------------- | ----------------------------- |
| [Node.js](https://nodejs.org/)                | Runtime JavaScript            |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática              |
| [Express](https://expressjs.com/)             | Framework HTTP                |
| [Prisma](https://www.prisma.io/)              | ORM para banco de dados       |
| [PostgreSQL](https://www.postgresql.org/)     | Banco de dados relacional     |
| [tsx](https://github.com/privatenumber/tsx)   | Execução de TypeScript em dev |

---

## 📁 Estrutura do Projeto

```
backend/
├── docs/                    # Documentação técnica
│   ├── architecture.md      # Arquitetura do sistema
│   ├── database.md          # Modelos e diagrama ER
│   └── api.md               # Documentação das rotas
├── generated/               # Código gerado (Prisma Client)
├── prisma/
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do Prisma
├── src/
│   ├── lib/
│   │   └── prisma.ts        # Instância do Prisma Client
│   ├── routes.ts            # Definição das rotas
│   └── server.ts            # Ponto de entrada do servidor
├── .env                     # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
├── prisma.config.ts         # Configuração do Prisma
└── tsconfig.json            # Configuração do TypeScript
```

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) (local ou hospedado, ex: [Neon](https://neon.tech/))

### Instalação

1. **Clone o repositório e acesse a pasta do backend:**

```bash
git clone https://github.com/seu-usuario/cats.git
cd cats/backend
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure as variáveis de ambiente:**

Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```env
PORT=3333
DATABASE_URL="postgresql://usuario:senha@host:5432/nome_do_banco?sslmode=require"
```

4. **Gere o Prisma Client e rode as migrações:**

```bash
npx prisma generate
npx prisma migrate dev
```

5. **Inicie o servidor em modo de desenvolvimento:**

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

### Verificando se está funcionando

```bash
curl http://localhost:3333/api/health
```

Resposta esperada:

```json
{
  "status": "ok",
  "message": "Cats API ok",
  "timestamp": "2026-07-23T00:00:00.000Z"
}
```

---

## 📜 Scripts Disponíveis

| Script | Comando       | Descrição                                |
| ------ | ------------- | ---------------------------------------- |
| `dev`  | `npm run dev` | Inicia o servidor com hot-reload via tsx |

---

## 🌐 Deploy

| Serviço                       | Parte              | Status       |
| ----------------------------- | ------------------ | ------------ |
| [Render](https://render.com/) | Backend (API)      | 📋 Planejado |
| [Vercel](https://vercel.com/) | Frontend (Next.js) | 📋 Planejado |

---

## 📚 Documentação

Documentação técnica detalhada está disponível na pasta [`docs/`](./docs/):

- [**Arquitetura**](./docs/architecture.md) — Visão geral da arquitetura do sistema
- [**Banco de Dados**](./docs/database.md) — Modelos, relacionamentos e diagrama ER
- [**API**](./docs/api.md) — Endpoints, request/response e status codes

---

## 🗺️ Roadmap

### Fase 1 — Fundação ✅

- [x] Setup do servidor Express + TypeScript
- [x] Configuração do Prisma com PostgreSQL
- [x] Modelagem do banco de dados
- [x] Health check endpoint

### Fase 2 — Autenticação

- [ ] Cadastro de usuário
- [ ] Login com JWT
- [ ] Middleware de autenticação
- [ ] Rotas protegidas

### Fase 3 — Funcionalidades Core

- [ ] CRUD de gatos (cadastrar, editar, remover)
- [ ] Upload de imagens
- [ ] Criação de posts (foto + legenda)
- [ ] Feed de fotos

### Fase 4 — Interações Sociais

- [ ] Curtir / descurtir posts
- [ ] Comentários nos posts
- [ ] Perfil do usuário (com seus gatos)
- [ ] Perfil do gato (fotos + dono)

### Fase 5 — Deploy e Polimento

- [ ] Deploy no Render
- [ ] Variáveis de ambiente em produção
- [ ] Tratamento de erros global
- [ ] Validação de dados (Zod)

---

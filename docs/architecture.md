# 🏗️ Arquitetura — Cats Backend

## Visão Geral

A arquitetura do backend segue o padrão de **Camadas (Layered Architecture)**, separando a responsabilidade de roteamento, controle de requisições/respostas, validação, regras de negócio e acesso ao banco de dados.

---

## Camadas do Sistema

### 1. Servidor HTTP & Rotas (`src/server.ts`, `src/routes/`)
- **Ponto de entrada:** Inicializa o Express, habilita parsers (JSON), habilita CORS e registra o manipulador global de erros.
- **Roteador Modular:** As rotas são organizadas por domínio dentro de `src/routes/` (ex: `user.routes.ts`, `cat.routes.ts`) e agregadas no roteador principal `src/routes/index.ts`. Cada rota se conecta aos seus respectivos middlewares, schemas Zod e controllers.

---

### 2. Middlewares & Erros (`src/middlewares/`, `src/errors/`)
- **`AppError` (`src/errors/AppError.ts`):** Classe de erro customizada estendendo `Error`, permitindo que os serviços lancem exceções de domínio com status HTTP específicos (ex: `400 Bad Request`, `403 Forbidden`, `404 Not Found`).
- **`validateSchema`:** Valida parâmetros e corpo das requisições utilizando schemas Zod antes de chegar ao controller.
- **`isAuthenticated`:** Intercepta rotas protegidas, valida o Token JWT enviado no header `Authorization: Bearer <token>` e injeta o `user_id` na requisição.
- **`errorHandler`:** Captura exceções capturadas pela aplicação. Se o erro for uma instância de `AppError`, retorna a mensagem amigável com seu status code configurado; caso contrário, gera uma resposta `500 Internal Server Error`.

---

### 3. Controllers (`src/controllers/`)
- Responsáveis por receber as requisições (`req`), extrair parâmetros, invocar o serviço de negócio correspondente e retornar a resposta HTTP (`res`) com o status code apropriado (`200`, `201`, etc.).

---

### 4. Schemas de Validação (`src/schemas/`)
- Schemas declarativos usando Zod para garantir que os dados recebidos estejam no formato esperado antes do processamento.

---

### 5. Services (`src/services/`)
- Contêm toda a **regra de negócio** da aplicação.
- Executam validações de domínio (ex: verificar se e-mail/username já existem), criptografia de senhas (bcryptjs) e comunicação com o banco de dados via Prisma Client.

---

### 6. Banco de Dados & ORM (`prisma/`, `src/lib/`)
- **Prisma Client:** Instância singleton exportada em `src/lib/prisma.ts`.
- **PostgreSQL:** Banco de dados relacional gerenciado via migrações do Prisma.


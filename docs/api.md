# 🌐 API — Cats Backend

## Visão Geral

A API do Cats segue o padrão **REST** e utiliza **JSON** como formato de dados.

- **Base URL (dev):** `http://localhost:3333/api`
- **Base URL (prod):** `https://cats-api.onrender.com/api` _(planejado)_
- **Autenticação:** Bearer Token (JWT)

---

### Status Codes

| Código | Significado | Uso |
|---|---|---|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos ou erro de validação (Zod) |
| `401` | Unauthorized | Token ausente, expirado ou inválido |
| `404` | Not Found | Recurso ou rota não encontrada |
| `500` | Internal Server Error | Erro interno inesperado do servidor |

---

## Endpoints

### 👤 Usuários & Autenticação

#### `POST /api/users`

Cadastra um novo usuário no sistema.

**Autenticação:** Não requer  
**Validação (Zod):** `name`, `username`, `email`, `password` (mínimo 6 caracteres).

**Body:**
```json
{
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "password": "senhaSegura123"
}
```

**Resposta `201` (Created):**
```json
{
  "id": "uuid-v4-exemplo",
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "role": "USER",
  "avatar_url": null,
  "created_at": "2026-07-25T20:00:00.000Z",
  "updated_at": "2026-07-25T20:00:00.000Z"
}
```

---

#### `POST /api/auth`

Autentica um usuário existente e retorna o Token JWT.

**Autenticação:** Não requer  
**Validação (Zod):** `email`, `password`.

**Body:**
```json
{
  "email": "joao@example.com",
  "password": "senhaSegura123"
}
```

**Resposta `200` (OK):**
```json
{
  "id": "uuid-v4-exemplo",
  "name": "João Silva",
  "email": "joao@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### `GET /api/me`

Retorna os detalhes do perfil do usuário autenticado.

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)

**Resposta `200` (OK):**
```json
{
  "id": "uuid-v4-exemplo",
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "avatar_url": null,
  "role": "USER",
  "created_at": "2026-07-25T20:00:00.000Z",
  "updated_at": "2026-07-25T20:00:00.000Z"
}
```

---

### 🐱 Gatos

#### `POST /api/cat`

Cadastra um novo gato associado ao usuário autenticado.

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `name` (mínimo 1 caractere), `birth_date` (Data em formato ISO opcional), `bio` (opcional), `avatar_url` (URL opcional).

**Body:**
```json
{
  "name": "Mingau",
  "birth_date": "2022-05-10T00:00:00.000Z",
  "bio": "Um gatinho muito carinhoso",
  "avatar_url": "https://example.com/mingau.jpg"
}
```

**Resposta `201` (Created):**
```json
{
  "id": "uuid-cat-exemplo",
  "name": "Mingau",
  "birth_date": "2022-05-10T00:00:00.000Z",
  "bio": "Um gatinho muito carinhoso",
  "avatar_url": "https://example.com/mingau.jpg",
  "owner_id": "uuid-v4-exemplo",
  "created_at": "2026-07-25T21:00:00.000Z",
  "updated_at": "2026-07-25T21:00:00.000Z"
}
```

---

#### `GET /api/users/:userId/cats`

Lista todos os gatos pertencentes a um determinado perfil de usuário (rota pública).

**Autenticação:** Não requer  
**Validação (Zod):** `userId` nos parâmetros da URL (obrigatório).

**Parâmetros de Rota:**
- `userId` (String): ID do usuário proprietário dos gatos.

**Resposta `200` (OK):**
```json
[
  {
    "id": "uuid-cat-exemplo",
    "name": "Mingau",
    "birthDate": "2022-05-10T00:00:00.000Z",
    "bio": "Um gatinho muito carinhoso",
    "avatarUrl": "https://example.com/mingau.jpg",
    "ownerId": "uuid-v4-exemplo",
    "createdAt": "2026-07-25T21:00:00.000Z",
    "updatedAt": "2026-07-25T21:00:00.000Z"
  }
]
```

---

#### `GET /api/cat/:id`

Busca os detalhes de um gato específico pelo ID.

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros da URL (obrigatório).

**Parâmetros de Rota:**
- `id` (String): ID do gato.

**Resposta `200` (OK):**
```json
{
  "cat": {
    "id": "uuid-cat-exemplo",
    "name": "Mingau",
    "birthDate": "2022-05-10T00:00:00.000Z",
    "bio": "Um gatinho muito carinhoso",
    "avatarUrl": "https://example.com/mingau.jpg",
    "ownerId": "uuid-v4-exemplo",
    "createdAt": "2026-07-25T21:00:00.000Z",
    "updatedAt": "2026-07-25T21:00:00.000Z"
  }
}
```

---

#### `PUT /api/cat/:id`

Atualiza as informações do perfil de um gato cadastrado (somente o dono pode atualizar seu próprio gato).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros (obrigatório); `name` (mínimo 2 caracteres opcional), `birthDate` (Data opcional), `bio` (opcional), `avatarUrl` (opcional) no body.

**Parâmetros de Rota:**
- `id` (String): ID do gato.

**Body (todos os campos são opcionais):**
```json
{
  "name": "Mingau Editado",
  "birthDate": "2022-05-10T00:00:00.000Z",
  "bio": "Gatinho carinhoso e dorminhoco",
  "avatarUrl": "https://example.com/novo-mingau.jpg"
}
```

**Resposta `200` (OK):**
```json
{
  "id": "uuid-cat-exemplo",
  "name": "Mingau Editado",
  "birthDate": "2022-05-10T00:00:00.000Z",
  "bio": "Gatinho carinhoso e dorminhoco",
  "avatarUrl": "https://example.com/novo-mingau.jpg",
  "ownerId": "uuid-v4-exemplo",
  "createdAt": "2026-07-25T21:00:00.000Z",
  "updatedAt": "2026-07-26T21:00:00.000Z"
}
```

---

#### `DELETE /api/cat/:id`

Remove um gato cadastrado (somente o dono pode remover seu próprio gato).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros da URL (UUID válido e obrigatório).

**Parâmetros de Rota:**
- `id` (UUID): ID do gato a ser removido.

**Resposta `200` (OK):**
```json
{
  "message": "Cat deleted"
}
```

---


## Estrutura Padrão de Erros

Em caso de erros na requisição, a API retorna respostas padronizadas no seguinte formato:

```json
{
  "error": "Descrição clara do erro ocorrido"
}
```

Para erros de validação via Zod (`400 Bad Request`):
```json
{
  "error": "Erro de validação nos dados enviados",
  "details": [
    {
      "field": "password",
      "message": "A senha deve ter no mínimo 6 caracteres"
    }
  ]
}
```

# 🌐 API — Cats Backend

## Visão Geral

A API do Cats segue o padrão **REST** e utiliza **JSON** como formato de dados.

- **Base URL (dev):** `http://localhost:3333/api`
- **Base URL (prod):** `https://cats-api.onrender.com/api` *(planejado)*
- **Autenticação:** Bearer Token (JWT) *(planejado)*

---

## Convenções

### Formato de Resposta

**Sucesso:**
```json
{
  "data": { ... }
}
```

**Sucesso com lista paginada:**
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 100
  }
}
```

**Erro:**
```json
{
  "error": "Mensagem de erro",
  "details": { ... }
}
```

### Status Codes

| Código | Significado | Uso |
|---|---|---|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `204` | No Content | Operação sem retorno (ex: deletar) |
| `400` | Bad Request | Dados inválidos na requisição |
| `401` | Unauthorized | Token ausente ou inválido |
| `403` | Forbidden | Sem permissão para a operação |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: e-mail já cadastrado) |
| `500` | Internal Server Error | Erro interno do servidor |

---

## Endpoints

### Health Check ✅

#### `GET /api/health`

Verifica se a API está rodando.

**Autenticação:** Não requer

**Resposta `200`:**
```json
{
  "status": "ok",
  "message": "Cats API ok",
  "timestamp": "2026-07-23T20:00:00.000Z"
}
```

---

### Autenticação 📋

#### `POST /api/auth/register`

Cadastra um novo usuário.

**Autenticação:** Não requer

**Body:**
```json
{
  "name": "Paulo",
  "username": "paulo",
  "email": "paulo@email.com",
  "password": "senha123"
}
```

**Resposta `201`:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "name": "Paulo",
      "username": "paulo",
      "email": "paulo@email.com",
      "avatarUrl": null,
      "role": "USER",
      "createdAt": "2026-07-23T20:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Erros:**
| Código | Quando |
|---|---|
| `400` | Campos obrigatórios faltando |
| `409` | E-mail ou username já cadastrado |

---

#### `POST /api/auth/login`

Realiza login e retorna um token JWT.

**Autenticação:** Não requer

**Body:**
```json
{
  "email": "paulo@email.com",
  "password": "senha123"
}
```

**Resposta `200`:**
```json
{
  "data": {
    "user": {
      "id": "uuid",
      "name": "Paulo",
      "username": "paulo",
      "email": "paulo@email.com",
      "avatarUrl": null,
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Erros:**
| Código | Quando |
|---|---|
| `400` | Campos obrigatórios faltando |
| `401` | E-mail ou senha incorretos |

---

### Usuários 📋

#### `GET /api/users/:id`

Retorna o perfil público de um usuário, incluindo seus gatos.

**Autenticação:** Requer token

**Resposta `200`:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Paulo",
    "username": "paulo",
    "avatarUrl": "https://...",
    "createdAt": "2026-07-23T20:00:00.000Z",
    "cats": [
      {
        "id": "uuid",
        "name": "Mingau",
        "avatarUrl": "https://...",
        "bio": "Gato preto muito fofo"
      }
    ],
    "_count": {
      "posts": 15,
      "cats": 2
    }
  }
}
```

**Erros:**
| Código | Quando |
|---|---|
| `404` | Usuário não encontrado |

---

#### `PUT /api/users/:id`

Atualiza os dados do próprio perfil.

**Autenticação:** Requer token (só o próprio usuário)

**Body:**
```json
{
  "name": "Paulo Silva",
  "avatarUrl": "https://..."
}
```

**Resposta `200`:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Paulo Silva",
    "username": "paulo",
    "email": "paulo@email.com",
    "avatarUrl": "https://..."
  }
}
```

**Erros:**
| Código | Quando |
|---|---|
| `403` | Tentando editar perfil de outro usuário |
| `404` | Usuário não encontrado |

---

### Gatos 📋

#### `POST /api/cats`

Cadastra um novo gato vinculado ao usuário autenticado.

**Autenticação:** Requer token

**Body:**
```json
{
  "name": "Mingau",
  "birthDate": "2023-05-15",
  "bio": "Gato preto muito fofo e brincalhão",
  "avatarUrl": "https://..."
}
```

**Resposta `201`:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Mingau",
    "birthDate": "2023-05-15T00:00:00.000Z",
    "bio": "Gato preto muito fofo e brincalhão",
    "avatarUrl": "https://...",
    "ownerId": "uuid",
    "createdAt": "2026-07-23T20:00:00.000Z"
  }
}
```

---

#### `GET /api/cats/:id`

Retorna o perfil de um gato com suas fotos e informações do dono.

**Autenticação:** Requer token

**Resposta `200`:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Mingau",
    "birthDate": "2023-05-15T00:00:00.000Z",
    "bio": "Gato preto muito fofo",
    "avatarUrl": "https://...",
    "owner": {
      "id": "uuid",
      "name": "Paulo",
      "username": "paulo",
      "avatarUrl": "https://..."
    },
    "posts": [
      {
        "id": "uuid",
        "caption": "Dormindo no sofá 😴",
        "imageUrl": "https://...",
        "createdAt": "2026-07-23T20:00:00.000Z",
        "_count": {
          "likes": 42,
          "comments": 5
        }
      }
    ]
  }
}
```

---

#### `PUT /api/cats/:id`

Atualiza os dados de um gato.

**Autenticação:** Requer token (só o dono do gato)

**Body:**
```json
{
  "name": "Mingau Jr.",
  "bio": "Atualizado: agora gosta de nadar"
}
```

---

#### `DELETE /api/cats/:id`

Remove um gato e todos os seus posts.

**Autenticação:** Requer token (só o dono do gato)

**Resposta:** `204 No Content`

---

### Posts 📋

#### `GET /api/posts`

Retorna o feed de fotos, com paginação.

**Autenticação:** Requer token

**Query Params:**
| Param | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | `number` | `1` | Página atual |
| `perPage` | `number` | `20` | Itens por página |

**Resposta `200`:**
```json
{
  "data": [
    {
      "id": "uuid",
      "caption": "Dormindo no sofá 😴",
      "imageUrl": "https://...",
      "createdAt": "2026-07-23T20:00:00.000Z",
      "author": {
        "id": "uuid",
        "name": "Paulo",
        "username": "paulo",
        "avatarUrl": "https://..."
      },
      "cat": {
        "id": "uuid",
        "name": "Mingau"
      },
      "_count": {
        "likes": 42,
        "comments": 5
      },
      "isLiked": true
    }
  ],
  "meta": {
    "page": 1,
    "perPage": 20,
    "total": 150
  }
}
```

---

#### `POST /api/posts`

Cria um novo post com uma foto de gato.

**Autenticação:** Requer token

**Body (multipart/form-data):**
| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `image` | `File` | ✅ | Arquivo da imagem |
| `caption` | `String` | ❌ | Legenda da foto |
| `catId` | `String` | ✅ | ID do gato na foto |

**Resposta `201`:**
```json
{
  "data": {
    "id": "uuid",
    "caption": "Dormindo no sofá 😴",
    "imageUrl": "https://...",
    "catId": "uuid",
    "authorId": "uuid",
    "createdAt": "2026-07-23T20:00:00.000Z"
  }
}
```

---

#### `GET /api/posts/:id`

Retorna um post específico com seus comentários.

**Autenticação:** Requer token

---

#### `DELETE /api/posts/:id`

Remove um post.

**Autenticação:** Requer token (só o autor)

**Resposta:** `204 No Content`

---

### Comentários 📋

#### `POST /api/posts/:postId/comments`

Adiciona um comentário a um post.

**Autenticação:** Requer token

**Body:**
```json
{
  "content": "Que gato lindo! 😍"
}
```

**Resposta `201`:**
```json
{
  "data": {
    "id": "uuid",
    "content": "Que gato lindo! 😍",
    "userId": "uuid",
    "postId": "uuid",
    "createdAt": "2026-07-23T20:00:00.000Z",
    "user": {
      "name": "Maria",
      "username": "maria",
      "avatarUrl": "https://..."
    }
  }
}
```

---

#### `GET /api/posts/:postId/comments`

Lista os comentários de um post.

**Autenticação:** Requer token

**Query Params:**
| Param | Tipo | Padrão | Descrição |
|---|---|---|---|
| `page` | `number` | `1` | Página atual |
| `perPage` | `number` | `20` | Itens por página |

---

#### `DELETE /api/comments/:id`

Remove um comentário.

**Autenticação:** Requer token (só o autor do comentário)

**Resposta:** `204 No Content`

---

### Curtidas 📋

#### `POST /api/posts/:postId/like`

Curte um post.

**Autenticação:** Requer token

**Resposta `201`:**
```json
{
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "postId": "uuid",
    "createdAt": "2026-07-23T20:00:00.000Z"
  }
}
```

**Erros:**
| Código | Quando |
|---|---|
| `409` | Usuário já curtiu este post |

---

#### `DELETE /api/posts/:postId/like`

Remove a curtida de um post.

**Autenticação:** Requer token

**Resposta:** `204 No Content`

---

## Legenda de Status

| Ícone | Significado |
|---|---|
| ✅ | Implementado |
| 📋 | Planejado (ainda não implementado) |

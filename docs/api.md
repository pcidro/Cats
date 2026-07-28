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

#### `GET /api/users/profile/:username`

Retorna o perfil público de um usuário através do seu nome de usuário (`username`), incluindo a lista dos seus gatos cadastrados.

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `username` nos parâmetros da URL (obrigatório).

**Parâmetros de Rota:**
- `username` (String): Nome de usuário único do perfil a ser buscado.

**Resposta `200` (OK):**
```json
{
  "id": "uuid-v4-exemplo",
  "name": "João Silva",
  "username": "joaosilva",
  "email": "joao@example.com",
  "avatarUrl": "https://res.cloudinary.com/.../avatars/avatar.png",
  "role": "USER",
  "createdAt": "2026-07-25T20:00:00.000Z",
  "updatedAt": "2026-07-27T10:00:00.000Z",
  "cats": [
    {
      "id": "uuid-cat-exemplo",
      "name": "Mingau",
      "birthDate": "2022-05-10T00:00:00.000Z",
      "bio": "Um gatinho muito carinhoso",
      "avatarUrl": "https://example.com/mingau.jpg",
      "createdAt": "2026-07-25T21:00:00.000Z"
    }
  ]
}
```

---

#### `PUT /api/users/update`

Atualiza os dados do perfil do usuário autenticado (username e/ou foto de avatar via Cloudinary).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Content-Type:** `multipart/form-data`  
**Validação (Zod):** `username` (mínimo 3 caracteres opcional); campo de arquivo `avatarUrl` (obrigatório para upload).

**Form Data:**
- `username` (Text, opcional): Novo nome de usuário.
- `avatarUrl` (File, obrigatório): Arquivo de imagem para o avatar.

**Resposta `200` (OK):**
```json
{
  "id": "uuid-v4-exemplo",
  "name": "João Silva",
  "username": "joaosilva_novo",
  "email": "joao@example.com",
  "avatarUrl": "https://res.cloudinary.com/.../avatars/1722000000-avatar.png",
  "role": "USER",
  "createdAt": "2026-07-25T20:00:00.000Z",
  "updatedAt": "2026-07-27T10:00:00.000Z"
}
```

---

#### `DELETE /api/users/delete`

Deleta a conta do usuário autenticado (somente o próprio usuário pode deletar sua conta). Também aceita `DELETE /api/users/me` ou `DELETE /api/users/:id`.

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros da URL (opcional, UUID válido).

**Resposta `200` (OK):**
```json
{
  "message": "User deleted successfully"
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
**Content-Type:** `multipart/form-data`  
**Validação (Zod):** `id` nos parâmetros (obrigatório); `name` (mínimo 2 caracteres opcional), `birthDate` (Data opcional), `bio` (opcional); campo de arquivo `avatarUrl` (opcional).

**Parâmetros de Rota:**
- `id` (String): ID do gato.

**Form Data (todos os campos são opcionais):**
- `name` (Text, opcional): Novo nome do gato.
- `birthDate` (Text, opcional): Data de nascimento.
- `bio` (Text, opcional): Biografia/descrição.
- `avatarUrl` (File, opcional): Arquivo de imagem para a foto do gato via Cloudinary.

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

### 📸 Posts

#### `GET /api/posts`

Retorna a lista de posts cadastrados no sistema (Feed de fotos), ordenados por data de criação mais recente, incluindo dados do gato e do autor.

**Autenticação:** Não requer  
**Validação (Zod):** `page` (número, opcional, padrão 1), `limit` (número, opcional, padrão 10, máx 100) na Query URL.

**Query Parameters:**
- `page` (Number, opcional): Número da página desejada. Ex: `?page=1`
- `limit` (Number, opcional): Quantidade de posts por página. Ex: `?limit=10`

**Resposta `200` (OK):**
```json
[
  {
    "id": "uuid-post-exemplo",
    "caption": "Mingau tirando uma soneca gostosa!",
    "imageUrl": "https://res.cloudinary.com/.../posts/1722000000-foto.png",
    "catId": "uuid-cat-exemplo",
    "authorId": "uuid-v4-exemplo",
    "createdAt": "2026-07-28T12:00:00.000Z",
    "updatedAt": "2026-07-28T12:00:00.000Z",
    "cat": {
      "id": "uuid-cat-exemplo",
      "name": "Mingau",
      "avatarUrl": "https://res.cloudinary.com/.../cat-avatar.png"
    },
    "author": {
      "id": "uuid-v4-exemplo",
      "name": "João Silva",
      "username": "joaosilva",
      "avatarUrl": null
    },
    "_count": {
      "likes": 5,
      "comments": 2
    }
  }
]
```

---

#### `POST /api/post/:cat_id`

Cria uma nova publicação (foto + legenda) vinculada a um gato (somente o dono do gato pode publicar).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Content-Type:** `multipart/form-data`  
**Validação (Zod):** `cat_id` nos parâmetros (obrigatório); `caption` (opcional); campo de arquivo `imageUrl` (obrigatório para upload).

**Parâmetros de Rota:**
- `cat_id` (String): ID do gato.

**Form Data:**
- `caption` (Text, opcional): Legenda da foto.
- `imageUrl` (File, obrigatório): Arquivo de imagem a ser enviado ao Cloudinary.

**Resposta `200` (OK):**
```json
{
  "id": "uuid-post-exemplo",
  "caption": "Mingau tirando uma soneca gostosa!",
  "imageUrl": "https://res.cloudinary.com/.../posts/1722000000-foto.png",
  "catId": "uuid-cat-exemplo",
  "authorId": "uuid-v4-exemplo",
  "createdAt": "2026-07-28T12:00:00.000Z",
  "updatedAt": "2026-07-28T12:00:00.000Z"
}
```

---

#### `PUT /api/post/:id`

Edita a legenda de um post existente (somente o autor do post pode editar).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros (obrigatório); `caption` (opcional).

**Parâmetros de Rota:**
- `id` (String): ID do post.

**Body:**
```json
{
  "caption": "Legenda atualizada do post!"
}
```

**Resposta `200` (OK):**
```json
{
  "id": "uuid-post-exemplo",
  "caption": "Legenda atualizada do post!",
  "imageUrl": "https://res.cloudinary.com/.../posts/1722000000-foto.png",
  "catId": "uuid-cat-exemplo",
  "authorId": "uuid-v4-exemplo",
  "createdAt": "2026-07-28T12:00:00.000Z",
  "updatedAt": "2026-07-28T12:05:00.000Z"
}
```

---

#### `DELETE /api/post/:id`

Remove uma publicação cadastrada (somente o autor do post pode remover).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `id` nos parâmetros da URL (UUID válido e obrigatório).

**Parâmetros de Rota:**
- `id` (UUID): ID do post a ser removido.

**Resposta `200` (OK):**
```json
{
  "message": "Post deleted successfully"
}
```

---

### ❤️ Curtidas (Likes)

#### `POST /api/like/:post_id`

Alterna o estado de curtida de um post pelo usuário autenticado (Toggle Like: curte se ainda não curtiu, descurte se já tiver curtido).

**Autenticação:** Bearer Token JWT (`Authorization: Bearer <token>`)  
**Validação (Zod):** `post_id` nos parâmetros da URL (UUID válido e obrigatório).

**Parâmetros de Rota:**
- `post_id` (UUID): ID do post a ser curtido/descurtido.

**Resposta `200` (OK) — Ao curtir:**
```json
{
  "liked": true
}
```

**Resposta `200` (OK) — Ao descurtir:**
```json
{
  "liked": false
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

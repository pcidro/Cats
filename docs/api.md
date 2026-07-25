# 🌐 API — Cats Backend

## Visão Geral

A API do Cats segue o padrão **REST** e utiliza **JSON** como formato de dados.

- **Base URL (dev):** `http://localhost:3333/api`
- **Base URL (prod):** `https://cats-api.onrender.com/api` _(planejado)_
- **Autenticação:** Bearer Token (JWT) _(planejado)_

---

````

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
````

---

# 🏗️ Arquitetura — Cats Backend

### 1. Servidor HTTP (Express)

O ponto de entrada da aplicação. Responsável por:

- Receber requisições HTTP
- Aplicar middlewares (CORS, JSON parser)
- Rotear para os handlers corretos
- Retornar respostas padronizadas

**Arquivos:** [`server.ts`](../src/server.ts), [`routes.ts`](../src/routes.ts)

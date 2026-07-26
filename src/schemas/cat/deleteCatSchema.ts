import { z } from "zod";

export const deleteCatSchema = z.object({
  body: z.object({
    id: z.string({ message: "O ID do gato é obrigatório" }).uuid({ message: "ID em formato inválido" }),
  }),
});

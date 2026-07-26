import { z } from "zod";

export const deleteCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "O ID do gato é obrigatório" }).uuid({ message: "ID em formato inválido" }),
  }),
});

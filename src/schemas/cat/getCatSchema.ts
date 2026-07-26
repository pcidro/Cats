import { z } from "zod";

export const getCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "O ID do gato é obrigatório" }),
  }),
});

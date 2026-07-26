import { z } from "zod";

export const createCatSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "O nome é obrigatório" })
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
    birthDate: z
      .coerce
      .date({ message: "Data de nascimento inválida" })
      .optional(),
    bio: z.string().optional(),
    avatarUrl: z
      .url({ message: "URL do avatar inválida" })
      .optional(),
  }),
});

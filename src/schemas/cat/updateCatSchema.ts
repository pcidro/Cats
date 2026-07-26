import { z } from "zod";

export const updateCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "ID inválido" }),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
      .optional(),
    birthDate: z.coerce
      .date({ message: "Data de nascimento inválida" })
      .optional(),
    bio: z.string().optional(),
    avatarUrl: z.string({ message: "URL inválida" }).optional(),
  }),
});

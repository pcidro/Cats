import { z } from "zod";

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: "Email inválido!" }),
    password: z
      .string({ message: "É necessário informar uma senha" })
      .min(1, { message: "É necessário informar uma senha" }),
  }),
});

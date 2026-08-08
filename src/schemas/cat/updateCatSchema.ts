import { z } from "zod";

export const updateCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "Invalid ID" }),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .optional(),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .optional(),
    birthDate: z.coerce
      .date({ message: "Invalid birth date" })
      .optional(),
    bio: z.string().optional(),
  }),
  file: z.any().optional(),
});


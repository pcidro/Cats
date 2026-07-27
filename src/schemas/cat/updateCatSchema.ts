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
    birthDate: z.coerce
      .date({ message: "Invalid birth date" })
      .optional(),
    bio: z.string().optional(),
    avatarUrl: z.string({ message: "Invalid URL" }).optional(),
  }),
});

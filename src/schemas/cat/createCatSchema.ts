import { z } from "zod";

export const createCatSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),
    username: z
      .string({ message: "Username is required" })
      .min(3, { message: "Username must be at least 3 characters" }),
    birthDate: z.coerce
      .date({ message: "Invalid birth date" })
      .optional(),
    bio: z.string().optional(),
  }),
  file: z.any().optional(),
});

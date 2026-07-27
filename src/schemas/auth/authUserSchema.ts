import { z } from "zod";

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string({ message: "Password is required" })
      .min(1, { message: "Password is required" }),
  }),
});

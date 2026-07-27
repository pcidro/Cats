import { z } from "zod";

export const getUserProfileSchema = z.object({
  params: z.object({
    username: z
      .string({ message: "Username is required" })
      .min(1, { message: "Username cannot be empty" }),
  }),
});

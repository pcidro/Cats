import { z } from "zod";

export const getUserCatsSchema = z.object({
  params: z.object({
    userId: z.string({ message: "User ID is required" }),
  }),
});

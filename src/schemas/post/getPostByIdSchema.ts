import { z } from "zod";

export const getPostByIdSchema = z.object({
  params: z.object({
    id: z.string({ message: "Post ID is required" }),
  }),
});

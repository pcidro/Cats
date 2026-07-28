import { z } from "zod";

export const deletePostSchema = z.object({
  params: z.object({
    id: z.string({ message: "Post ID is required" }),
  }),
});

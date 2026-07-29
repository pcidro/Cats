import { z } from "zod";

export const createCommentSchema = z.object({
  params: z.object({
    post_id: z.string({ message: "Post ID is required" }),
  }),
  body: z.object({
    content: z
      .string({ message: "Content is required" })
      .min(1, { message: "Content cannot be empty" }),
  }),
});

import { z } from "zod";

export const updateCommentSchema = z.object({
  params: z.object({
    id: z.string({ message: "Comment ID is required" }),
  }),
  body: z.object({
    content: z
      .string({ message: "Content is required" })
      .min(1, { message: "Content cannot be empty" }),
  }),
});

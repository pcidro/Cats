import { z } from "zod";

export const createPostSchema = z.object({
  params: z.object({
    cat_id: z.string({ message: "Cat ID is required" }),
  }),
  body: z.object({
    caption: z.string().optional(),
  }),
  file: z.any().optional(),
});

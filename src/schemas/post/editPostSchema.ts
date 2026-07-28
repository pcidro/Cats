import { z } from "zod";

export const editPostSchema = z.object({
  params: z.object({
    id: z.string({ message: "Post ID is required" }),
  }),
  body: z.object({
    caption: z.string().optional(),
  }),
});

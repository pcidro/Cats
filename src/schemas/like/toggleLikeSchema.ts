import { z } from "zod";

export const toggleLikeSchema = z.object({
  params: z.object({
    post_id: z.string({ message: "Post ID is required" }),
  }),
});

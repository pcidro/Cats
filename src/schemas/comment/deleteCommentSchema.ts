import { z } from "zod";

export const deleteCommentSchema = z.object({
  params: z.object({
    id: z.string({ message: "Comment ID is required" }),
  }),
});

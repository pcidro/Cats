import { z } from "zod";

export const getCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "Cat ID is required" }),
  }),
});

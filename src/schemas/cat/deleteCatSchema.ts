import { z } from "zod";

export const deleteCatSchema = z.object({
  params: z.object({
    id: z.string({ message: "Cat ID is required" }).uuid({ message: "Invalid ID format" }),
  }),
});

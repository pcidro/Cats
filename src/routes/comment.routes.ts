import { Router } from "express";
import { CreateCommentController } from "../controllers/comment/CreateCommentController";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { createCommentSchema } from "../schemas/comment/createCommentSchema";

const commentRoutes = Router();

commentRoutes.post(
  "/comment/:post_id",
  isAuthenticated,
  validateSchema(createCommentSchema),
  new CreateCommentController().handle,
);

export { commentRoutes };

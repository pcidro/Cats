import { Router } from "express";
import { CreateCommentController } from "../controllers/comment/CreateCommentController";
import { DeleteCommentController } from "../controllers/comment/DeleteCommentController";
import { UpdateCommentController } from "../controllers/comment/UpdateCommentController";
import { GetCommentsByPostController } from "../controllers/comment/GetCommentsByPostController";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { createCommentSchema } from "../schemas/comment/createCommentSchema";
import { deleteCommentSchema } from "../schemas/comment/deleteCommentSchema";
import { updateCommentSchema } from "../schemas/comment/updateCommentSchema";
import { getCommentsByPostSchema } from "../schemas/comment/getCommentsByPostSchema";

const commentRoutes = Router();

commentRoutes.get(
  "/comments/:post_id",
  validateSchema(getCommentsByPostSchema),
  new GetCommentsByPostController().handle,
);

commentRoutes.post(
  "/comment/:post_id",
  isAuthenticated,
  validateSchema(createCommentSchema),
  new CreateCommentController().handle,
);

commentRoutes.put(
  "/comment/:id",
  isAuthenticated,
  validateSchema(updateCommentSchema),
  new UpdateCommentController().handle,
);

commentRoutes.delete(
  "/comment/:id",
  isAuthenticated,
  validateSchema(deleteCommentSchema),
  new DeleteCommentController().handle,
);

export { commentRoutes };

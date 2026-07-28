import { isAuthenticated } from "../middlewares/IsAuthenticated";
import multer from "multer";
import uploadConfig from "../config/multer";
import { Router } from "express";
import { CreatePostController } from "../controllers/post/CreatePostController";
import { EditPostController } from "../controllers/post/EditPostController";
import { DeletePostController } from "../controllers/post/DeletePostController";
import { validateSchema } from "../middlewares/validateSchema";
import { createPostSchema } from "../schemas/post/createPostSchema";
import { editPostSchema } from "../schemas/post/editPostSchema";
import { deletePostSchema } from "../schemas/post/deletePostSchema";

const postRoutes = Router();
const upload = multer(uploadConfig);

// Rotas Posts
postRoutes.post(
  "/post/:cat_id",
  isAuthenticated,
  upload.single("imageUrl"),
  validateSchema(createPostSchema),
  new CreatePostController().handle,
);

postRoutes.put(
  "/post/:id",
  isAuthenticated,
  validateSchema(editPostSchema),
  new EditPostController().handle,
);

postRoutes.delete(
  "/post/:id",
  isAuthenticated,
  validateSchema(deletePostSchema),
  new DeletePostController().handle,
);

export { postRoutes };


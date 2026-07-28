import { Router } from "express";
import { ToggleLikeController } from "../controllers/likes/ToggleLikeController";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { validateSchema } from "../middlewares/validateSchema";
import { toggleLikeSchema } from "../schemas/like/toggleLikeSchema";

const likeRoutes = Router();

likeRoutes.post(
  "/like/:post_id",
  isAuthenticated,
  validateSchema(toggleLikeSchema),
  new ToggleLikeController().handle,
);

export { likeRoutes };

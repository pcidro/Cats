import { Router } from "express";
import { userRoutes } from "./user.routes";
import { catRoutes } from "./cat.routes";
import { postRoutes } from "./post.routes";
import { likeRoutes } from "./like.routes";
import { commentRoutes } from "./comment.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(catRoutes);
routes.use(postRoutes);
routes.use(likeRoutes);
routes.use(commentRoutes);

export default routes;

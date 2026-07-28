import { Router } from "express";
import { userRoutes } from "./user.routes";
import { catRoutes } from "./cat.routes";
import { postRoutes } from "./post.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(catRoutes);
routes.use(postRoutes);

export default routes;

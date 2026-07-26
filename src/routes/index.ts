import { Router } from "express";
import { userRoutes } from "./user.routes";
import { catRoutes } from "./cat.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(catRoutes);

export default routes;

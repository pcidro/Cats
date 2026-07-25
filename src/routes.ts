import { Router, Request, Response } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/auth/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/user/createUserSchema";
import { authUserSchema } from "./schemas/auth/authUserSchema";

const routes = Router();

routes.post(
  "/users",
  validateSchema(createUserSchema),
  new UserController().handle,
);

routes.post(
  "/auth",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

export default routes;

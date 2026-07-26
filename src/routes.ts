import { Router } from "express";
import { UserController } from "./controllers/user/UserController";
import { AuthUserController } from "./controllers/auth/AuthUserController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/user/createUserSchema";
import { authUserSchema } from "./schemas/auth/authUserSchema";
import { DetailUserController } from "./controllers/user/DetailuserController";
import { isAuthenticated } from "./middlewares/IsAuthenticated";
import { CreateCatController } from "./controllers/cat/CreateCatController";
import { createCatSchema } from "./schemas/cat/createCatSchema";

const routes = Router();

// Routes User

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

routes.get("/me", isAuthenticated, new DetailUserController().handle);

// Rotas Cats

routes.post(
  "/cat",
  isAuthenticated,
  validateSchema(createCatSchema),
  new CreateCatController().handle,
);

export default routes;

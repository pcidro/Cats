import { Router } from "express";
import { UserController } from "../controllers/user/UserController";
import { AuthUserController } from "../controllers/auth/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailuserController";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema } from "../schemas/user/createUserSchema";
import { authUserSchema } from "../schemas/auth/authUserSchema";
import { isAuthenticated } from "../middlewares/IsAuthenticated";

const userRoutes = Router();

// Routes User
userRoutes.post(
  "/users",
  validateSchema(createUserSchema),
  new UserController().handle,
);

userRoutes.post(
  "/auth",
  validateSchema(authUserSchema),
  new AuthUserController().handle,
);

userRoutes.get("/me", isAuthenticated, new DetailUserController().handle);

export { userRoutes };

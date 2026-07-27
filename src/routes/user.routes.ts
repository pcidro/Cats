import { Router } from "express";
import { UserController } from "../controllers/user/UserController";
import { AuthUserController } from "../controllers/auth/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailuserController";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema } from "../schemas/user/createUserSchema";
import { updateUserSchema } from "../schemas/user/updateUserSchema";
import { authUserSchema } from "../schemas/auth/authUserSchema";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import multer from "multer";
import uploadConfig from "../config/multer";

const userRoutes = Router();
const upload = multer(uploadConfig);

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

userRoutes.put(
  "/users/update",
  isAuthenticated,
  upload.single("avatarUrl"),
  validateSchema(updateUserSchema),
  new UpdateUserController().handle,
);

export { userRoutes };


import { Router } from "express";
import { UserController } from "../controllers/user/UserController";
import { AuthUserController } from "../controllers/auth/AuthUserController";
import { DetailUserController } from "../controllers/user/DetailuserController";
import { GetUserProfileController } from "../controllers/user/GetUserProfileController";
import { validateSchema } from "../middlewares/validateSchema";
import { createUserSchema } from "../schemas/user/createUserSchema";
import { updateUserSchema } from "../schemas/user/updateUserSchema";
import { getUserProfileSchema } from "../schemas/user/getUserProfileSchema";
import { authUserSchema } from "../schemas/auth/authUserSchema";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { UpdateUserController } from "../controllers/user/UpdateUserController";
import { DeleteUserController } from "../controllers/user/DeleteUserController";
import { deleteUserSchema } from "../schemas/user/deleteUserSchema";
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

userRoutes.get(
  "/users/profile/:username",
  validateSchema(getUserProfileSchema),
  new GetUserProfileController().handle,
);

userRoutes.put(
  "/users/update",
  isAuthenticated,
  upload.single("avatarUrl"),
  validateSchema(updateUserSchema),
  new UpdateUserController().handle,
);

userRoutes.delete(
  "/users/delete",
  isAuthenticated,
  validateSchema(deleteUserSchema),
  new DeleteUserController().handle,
);

export { userRoutes };

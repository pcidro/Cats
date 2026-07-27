import { Router } from "express";
import { CreateCatController } from "../controllers/cat/CreateCatController";
import { DeleteCatController } from "../controllers/cat/DeleteCatController";
import { GetCatController } from "../controllers/cat/GetCatController";
import { GetUserCatsController } from "../controllers/cat/GetUserCatsController";
import { UpdateCatController } from "../controllers/cat/UpdateCatController";
import { validateSchema } from "../middlewares/validateSchema";
import { createCatSchema } from "../schemas/cat/createCatSchema";
import { deleteCatSchema } from "../schemas/cat/deleteCatSchema";
import { getCatSchema } from "../schemas/cat/getCatSchema";
import { getUserCatsSchema } from "../schemas/cat/getUserCatsSchema";
import { updateCatSchema } from "../schemas/cat/updateCatSchema";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import multer from "multer";
import uploadConfig from "../config/multer";

const catRoutes = Router();
const upload = multer(uploadConfig);

// Rotas Cats
catRoutes.post(
  "/cat",
  isAuthenticated,
  upload.single("avatarUrl"),
  validateSchema(createCatSchema),
  new CreateCatController().handle,
);

catRoutes.get(
  "/users/:userId/cats",
  validateSchema(getUserCatsSchema),
  new GetUserCatsController().handle,
);

catRoutes.get(
  "/cat/:id",
  isAuthenticated,
  validateSchema(getCatSchema),
  new GetCatController().handle,
);

catRoutes.put(
  "/cat/:id",
  isAuthenticated,
  validateSchema(updateCatSchema),
  new UpdateCatController().handle,
);

catRoutes.delete(
  "/cat/:id",
  isAuthenticated,
  validateSchema(deleteCatSchema),
  new DeleteCatController().handle,
);

export { catRoutes };

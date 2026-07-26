import { Router } from "express";
import { CreateCatController } from "../controllers/cat/CreateCatController";
import { DeleteCatController } from "../controllers/cat/DeleteCatController";
import { GetCatController } from "../controllers/cat/GetCatController";
import { validateSchema } from "../middlewares/validateSchema";
import { createCatSchema } from "../schemas/cat/createCatSchema";
import { deleteCatSchema } from "../schemas/cat/deleteCatSchema";
import { getCatSchema } from "../schemas/cat/getCatSchema";
import { isAuthenticated } from "../middlewares/IsAuthenticated";

const catRoutes = Router();

// Rotas Cats
catRoutes.post(
  "/cat",
  isAuthenticated,
  validateSchema(createCatSchema),
  new CreateCatController().handle,
);

catRoutes.get(
  "/cat/:id",
  isAuthenticated,
  validateSchema(getCatSchema),
  new GetCatController().handle,
);

catRoutes.delete(
  "/cat/:id",
  isAuthenticated,
  validateSchema(deleteCatSchema),
  new DeleteCatController().handle,
);

export { catRoutes };

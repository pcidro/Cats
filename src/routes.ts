import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Cats API ok",
    timestamp: new Date(),
  });
});

export default routes;

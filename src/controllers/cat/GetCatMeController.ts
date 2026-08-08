import { Request, Response } from "express";
import { GetCatMeService } from "../../services/cat/GetCatMeService";

export class GetCatMeController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id;

    const getCatMeService = new GetCatMeService();

    const cats = await getCatMeService.execute({
      userId: userId as string,
    });

    return res.json(cats);
  }
}


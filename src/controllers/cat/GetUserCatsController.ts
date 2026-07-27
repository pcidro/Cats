import { Request, Response } from "express";
import { GetUserCatsService } from "../../services/cat/GetUserCatsService";

export class GetUserCatsController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const getUserCatsService = new GetUserCatsService();

    const cats = await getUserCatsService.execute({
      userId: userId as string,
    });

    return res.json(cats);
  }
}

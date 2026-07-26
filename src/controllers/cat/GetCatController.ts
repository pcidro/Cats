import { Request, Response } from "express";
import { GetCatService } from "../../services/cat/GetCatService";

export class GetCatController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getCat = new GetCatService();

    const cat = await getCat.execute({
      id: id as string,
    });

    return res.json({ cat });
  }
}

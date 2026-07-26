import { Request, Response } from "express";
import { deleteCatService } from "../../services/cat/DeleteCatService";

export class DeleteCatController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;
    const ownerId = req.user_id;

    const DeleteCatService = new deleteCatService();

    const cat = await DeleteCatService.execute({
      id,
      ownerId,
    });

    return res.json({ message: "Cat deleted", cat });
  }
}

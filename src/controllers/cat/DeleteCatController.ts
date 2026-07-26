import { Request, Response } from "express";
import { deleteCatService } from "../../services/cat/DeleteCatService";

export class DeleteCatController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const ownerId = req.user_id;

    const DeleteCatService = new deleteCatService();

    const cat = await DeleteCatService.execute({
      id: id as string,
      ownerId,
    });

    return res.json({ message: "Cat deleted", cat });
  }
}

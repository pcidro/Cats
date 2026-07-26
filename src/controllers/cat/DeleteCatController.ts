import { Request, Response } from "express";
import { DeleteCatService } from "../../services/cat/DeleteCatService";

export class DeleteCatController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const ownerId = req.user_id;

    const deleteCatService = new DeleteCatService();

    const cat = await deleteCatService.execute({
      id: id as string,
      ownerId: ownerId!,
    });

    return res.json({ message: "Cat deleted", cat });
  }
}

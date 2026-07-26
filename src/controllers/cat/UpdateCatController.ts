import { Request, Response } from "express";
import { UpdateCatService } from "../../services/cat/UpdateCatService";

export class UpdateCatController {
  async handle(req: Request, res: Response) {
    const { name, birthDate, bio, avatarUrl } = req.body;
    const { id } = req.params;
    const ownerId = req.user_id;
    const updateCatService = new UpdateCatService();

    const cat = await updateCatService.execute({
      id: id as string,
      name,
      birthDate: birthDate ? new Date(birthDate) : undefined,
      bio,
      avatarUrl,
      ownerId: ownerId!,
    });

    return res.json(cat);
  }
}

import { Request, Response } from "express";
import { CreateCatService } from "../../services/cat/CreateCatService";

export class CreateCatController {
  async handle(req: Request, res: Response) {
    const { name, birthDate, bio, avatarUrl } = req.body;
    const ownerId = req.user_id;
    const createCatService = new CreateCatService();

    const cat = await createCatService.execute({
      name,
      birthDate,
      bio,
      avatarUrl,
      ownerId: ownerId!,
    });

    return res.json(cat);
  }
}

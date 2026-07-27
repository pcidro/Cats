import { Request, Response } from "express";
import { CreateCatService } from "../../services/cat/CreateCatService";

export class CreateCatController {
  async handle(req: Request, res: Response) {
    const { name, birthDate, bio } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const ownerId = req.user_id;
    const createCatService = new CreateCatService();

    const cat = await createCatService.execute({
      name,
      birthDate,
      bio,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
      ownerId: ownerId!,
    });

    return res.json(cat);
  }
}

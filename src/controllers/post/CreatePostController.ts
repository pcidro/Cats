import { Request, Response } from "express";
import { CreatePostService } from "../../services/post/CreatePostService";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { caption } = req.body;
    const { cat_id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const author_id = req.user_id;
    const createpost = new CreatePostService();

    const post = await createpost.execute({
      caption,
      imageBuffer: req.file.buffer,
      imageName: req.file.originalname,
      author_id,
      cat_id: cat_id as string,
    });

    return res.json(post);
  }
}

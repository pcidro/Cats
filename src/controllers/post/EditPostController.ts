import { Request, Response } from "express";
import { EditPostService } from "../../services/post/EditPostService";

export class EditPostController {
  async handle(req: Request, res: Response) {
    const { caption } = req.body;
    const { id } = req.params;
    const author_id = req.user_id;

    const updatePost = new EditPostService();

    const post = await updatePost.execute({
      caption,
      id: id as string,
      author_id,
    });

    return res.json(post);
  }
}

import { Request, Response } from "express";
import { DeletePostService } from "../../services/post/DeletePostService";

export class DeletePostController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const authorId = req.user_id;

    const deletePostService = new DeletePostService();

    const result = await deletePostService.execute({
      id: id as string,
      authorId: authorId!,
    });

    return res.json(result);
  }
}

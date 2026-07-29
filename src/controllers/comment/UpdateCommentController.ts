import { Request, Response } from "express";
import { UpdateCommentService } from "../../services/comment/UpdateCommentService";

export class UpdateCommentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user_id;

    const updateCommentService = new UpdateCommentService();

    const comment = await updateCommentService.execute({
      id: id as string,
      user_id: user_id!,
      content,
    });

    return res.json(comment);
  }
}

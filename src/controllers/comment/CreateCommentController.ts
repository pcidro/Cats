import { Request, Response } from "express";
import { CreateCommentService } from "../../services/comment/CreateCommentService";

export class CreateCommentController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { post_id } = req.params;
    const { content } = req.body;

    const createComment = new CreateCommentService();

    const comment = await createComment.execute({
      user_id,
      post_id: post_id as string,
      content,
    });

    return res.status(201).json(comment);
  }
}

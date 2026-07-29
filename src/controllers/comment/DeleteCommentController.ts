import { Request, Response } from "express";
import { DeleteCommentService } from "../../services/comment/DeleteCommentService";

export class DeleteCommentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user_id = req.user_id;

    const deleteCommentService = new DeleteCommentService();

    const comment = await deleteCommentService.execute({
      id: id as string,
      user_id: user_id!,
    });

    return res.json({ message: "Comment deleted", comment });
  }
}

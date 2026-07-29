import { Request, Response } from "express";
import { GetCommentsByPostService } from "../../services/comment/GetCommentsByPostService";

export class GetCommentsByPostController {
  async handle(req: Request, res: Response) {
    const { post_id } = req.params;

    const getCommentsByPostService = new GetCommentsByPostService();

    const comments = await getCommentsByPostService.execute({
      post_id: post_id as string,
    });

    return res.json(comments);
  }
}

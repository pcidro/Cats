import { Request, Response } from "express";
import { GetPostService } from "../../services/post/GetPostService";

export class GetPostController {
  async handle(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const getPostService = new GetPostService();

    const posts = await getPostService.execute({ page, limit });

    return res.json(posts);
  }
}

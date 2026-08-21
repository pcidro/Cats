import { Request, Response } from "express";
import { GetPostByIdService } from "../../services/post/GetPostByIdService";

export class GetPostByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getPostByIdService = new GetPostByIdService();

    const post = await getPostByIdService.execute({
      id: id as string,
    });

    return res.json(post);
  }
}

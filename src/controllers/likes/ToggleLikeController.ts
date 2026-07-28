import { Request, Response } from "express";
import { ToggleLikeService } from "../../services/like/ToggleLikeService";

export class ToggleLikeController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { post_id } = req.params;

    const toggleLike = new ToggleLikeService();

    const like = await toggleLike.execute({
      user_id,
      post_id: post_id as string,
    });

    return res.json(like);
  }
}

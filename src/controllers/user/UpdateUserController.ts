import { Request, Response } from "express";
import { UpdateUserService } from "../../services/user/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { username } = req.body;

    const userId = req.user_id;
    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id: userId!,
      username,
      imageBuffer: req.file?.buffer,
      imageName: req.file?.originalname,
    });

    return res.json(user);
  }
}

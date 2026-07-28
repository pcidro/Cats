import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const userId = req.user_id!;

    const deleteUserService = new DeleteUserService();
    const result = await deleteUserService.execute({ userId });

    return res.json(result);
  }
}

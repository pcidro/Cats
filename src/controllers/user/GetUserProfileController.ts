import { Request, Response } from "express";
import { GetUserProfileService } from "../../services/user/GetUserProfileService";

export class GetUserProfileController {
  async handle(req: Request, res: Response) {
    const { username } = req.params;

    const getUserProfileService = new GetUserProfileService();
    const userProfile = await getUserProfileService.execute({
      username: username as string,
    });

    return res.json(userProfile);
  }
}

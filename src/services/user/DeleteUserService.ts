import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface DeleteUserServiceProps {
  userId: string;
}

export class DeleteUserService {
  async execute({ userId }: DeleteUserServiceProps) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return {
      message: "User deleted successfully",
    };
  }
}

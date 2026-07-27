import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface GetUserProfileProps {
  username: string;
}

export class GetUserProfileService {
  async execute({ username }: GetUserProfileProps) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        cats: {
          select: {
            id: true,
            name: true,
            birthDate: true,
            bio: true,
            avatarUrl: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}

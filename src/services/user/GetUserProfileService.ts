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
            username: true,
          },
        },
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            cat: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                avatarUrl: true,
              },
            },
            comments: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    username: true,
                    avatarUrl: true,
                  },
                },
              },
            },
            likes: {
              select: {
                userId: true,
              },
            },
            _count: {
              select: { likes: true, comments: true },
            },
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

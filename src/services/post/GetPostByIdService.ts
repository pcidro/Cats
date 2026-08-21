import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface GetPostByIdRequest {
  id: string;
}

export class GetPostByIdService {
  async execute({ id }: GetPostByIdRequest) {
    const post = await prisma.post.findFirst({
      where: {
        id,
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
          orderBy: {
            createdAt: "asc",
          },
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
    });

    if (!post) {
      throw new AppError("Post not found!", 404);
    }

    return post;
  }
}

import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface GetCommentsByPostProps {
  post_id: string;
}

export class GetCommentsByPostService {
  async execute({ post_id }: GetCommentsByPostProps) {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      throw new AppError("Post not found!", 404);
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: post_id,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return comments;
  }
}

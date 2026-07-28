import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface ToggleLikeServiceProps {
  user_id: string;
  post_id: string;
}

export class ToggleLikeService {
  async execute({ user_id, post_id }: ToggleLikeServiceProps) {
    const post = await prisma.post.findUnique({
      where: {
        id: post_id,
      },
      select: {
        id: true,
      },
    });

    if (!post) {
      throw new AppError("No Post Found!", 404);
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user_id,
          postId: post_id,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user_id,
            postId: post_id,
          },
        },
      });
      return { liked: false };
    }

    await prisma.like.create({
      data: {
        userId: user_id,
        postId: post_id,
      },
    });

    return { liked: true };
  }
}

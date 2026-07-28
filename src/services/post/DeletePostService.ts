import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface DeletePostServiceProps {
  id: string;
  authorId: string;
}

export class DeletePostService {
  async execute({ id, authorId }: DeletePostServiceProps) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new AppError("Post not found!", 404);
    }

    if (post.authorId !== authorId) {
      throw new AppError(
        "Unauthorized! You can only delete your own posts.",
        403
      );
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });

    return { message: "Post deleted successfully" };
  }
}

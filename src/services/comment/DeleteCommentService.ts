import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface DeleteCommentServiceProps {
  id: string;
  user_id: string;
}

export class DeleteCommentService {
  async execute({ id, user_id }: DeleteCommentServiceProps) {
    const comment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new AppError("Comment not found!", 404);
    }

    if (comment.userId !== user_id) {
      throw new AppError(
        "Unauthorized! You can only delete your own comments.",
        403,
      );
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return comment;
  }
}

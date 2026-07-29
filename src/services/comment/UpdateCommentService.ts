import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface UpdateCommentServiceProps {
  id: string;
  user_id: string;
  content: string;
}

export class UpdateCommentService {
  async execute({ id, user_id, content }: UpdateCommentServiceProps) {
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
        "Unauthorized! You can only edit your own comments.",
        403,
      );
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });

    return updatedComment;
  }
}

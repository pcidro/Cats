import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface CommentServiceProps {
  user_id: string;
  post_id: string;
  content: string;
}

export class CreateCommentService {
  async execute({ user_id, post_id, content }: CommentServiceProps) {
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

    const comment = await prisma.comment.create({
      data: {
        userId: user_id,
        content,
        postId: post_id,
      },
    });
    return comment;
  }
}

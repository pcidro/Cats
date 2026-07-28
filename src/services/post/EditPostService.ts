import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface EditPostServiceProps {
  caption: string;
  id: string;
  author_id: string;
}

export class EditPostService {
  async execute({ caption, id, author_id }: EditPostServiceProps) {
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    });
    if (!post) {
      throw new AppError("No Post Found!", 404);
    }

    if (post.authorId !== author_id) {
      throw new AppError(
        "Unauthorized! You can only edit your own posts.",
        403,
      );
    }

    const updatePost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        caption: caption ?? post.caption,
      },
    });

    return updatePost;
  }
}

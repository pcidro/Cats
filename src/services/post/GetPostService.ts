import { prisma } from "../../lib/prisma";

interface GetPostRequest {
  page?: number;
  limit?: number;
}

export class GetPostService {
  async execute({ page = 1, limit = 10 }: GetPostRequest = {}) {
    const skip = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        cat: {
          select: {
            id: true,
            name: true,
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
        _count: {
          select: { likes: true, comments: true },
        },
      },
    });

    return posts;
  }
}

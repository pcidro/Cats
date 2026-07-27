import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface GetUserCatsServiceProps {
  userId: string;
}

export class GetUserCatsService {
  async execute({ userId }: GetUserCatsServiceProps) {
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    const cats = await prisma.cat.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return cats;
  }
}

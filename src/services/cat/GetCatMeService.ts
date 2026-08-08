import { prisma } from "../../lib/prisma";

interface GetCatMeServiceProps {
  userId: string;
}

export class GetCatMeService {
  async execute({ userId }: GetCatMeServiceProps) {
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


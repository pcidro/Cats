import { prisma } from "../../lib/prisma";

interface DeleteCatServiceProps {
  id: string;
  ownerId: string;
}

export class deleteCatService {
  async execute({ id, ownerId }: DeleteCatServiceProps) {
    const cat = await prisma.cat.findUnique({
      where: {
        id,
      },
    });
    if (!cat) {
      throw new Error("Cat not found!");
    }

    if (cat.ownerId !== ownerId) {
      throw new Error("Unauthorized! You can only delete your own cats.");
    }

    await prisma.cat.delete({
      where: {
        id: id,
      },
    });
  }
}

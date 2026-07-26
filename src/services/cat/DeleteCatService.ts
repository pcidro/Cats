import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface DeleteCatServiceProps {
  id: string;
  ownerId: string;
}

export class DeleteCatService {
  async execute({ id, ownerId }: DeleteCatServiceProps) {
    const cat = await prisma.cat.findUnique({
      where: {
        id,
      },
    });
    if (!cat) {
      throw new AppError("Cat not found!", 404);
    }

    if (cat.ownerId !== ownerId) {
      throw new AppError("Unauthorized! You can only delete your own cats.", 403);
    }

    await prisma.cat.delete({
      where: {
        id: id,
      },
    });
  }
}

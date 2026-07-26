import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface UpdateCatServiceProps {
  id: string;
  ownerId: string;
  avatarUrl?: string;
  name?: string;
  bio?: string;
  birthDate?: Date | null;
}

export class UpdateCatService {
  async execute({
    id,
    ownerId,
    name,
    bio,
    birthDate,
    avatarUrl,
  }: UpdateCatServiceProps) {
    const cat = await prisma.cat.findFirst({
      where: {
        id,
      },
    });
    if (!cat) {
      throw new AppError("No Cat Found!", 404);
    }

    if (cat.ownerId !== ownerId) {
      throw new AppError("Unauthorized! You can only edit your own cats.", 403);
    }

    const updateCat = await prisma.cat.update({
      where: {
        id: id,
      },
      data: {
        name: name ?? cat.name,
        bio: bio ?? cat.bio,
        birthDate: birthDate ?? cat.birthDate,
        avatarUrl: avatarUrl ?? cat.avatarUrl,
      },
    });

    return updateCat;
  }
}

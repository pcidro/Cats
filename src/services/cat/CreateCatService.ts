import { prisma } from "../../lib/prisma";

interface CreateCatServiceProps {
  name: string;
  birthDate?: Date;
  bio?: string;
  ownerId: string;
  avatarUrl?: string;
}

export class CreateCatService {
  async execute({
    name,
    birthDate,
    bio,
    ownerId,
    avatarUrl,
  }: CreateCatServiceProps) {
    const cat = await prisma.cat.create({
      data: {
        name,
        birthDate: birthDate ? new Date(birthDate) : null,
        bio,
        ownerId,
        avatarUrl,
      },
    });

    return cat;
  }
}

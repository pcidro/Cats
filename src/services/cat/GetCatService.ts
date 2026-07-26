import { prisma } from "../../lib/prisma";

interface getCatServiceProps {
  id: string;
}

export class GetCatService {
  async execute({ id }: getCatServiceProps) {
    const cat = await prisma.cat.findFirst({
      where: {
        id,
      },
    });
    if (!cat) {
      throw new Error("No Cat Found!");
    }
    return cat;
  }
}

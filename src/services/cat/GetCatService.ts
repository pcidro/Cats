import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

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
      throw new AppError("No Cat Found!", 404);
    }
    return cat;
  }
}

import { hash } from "bcryptjs";

import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: CreateUserProps) {
    const normalizedEmail = email.trim().toLowerCase();

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já cadastrado!", 400);
    }

    const username = await this.generateUsername(name);
    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        username,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  private async generateUsername(name: string) {
    const baseUsername = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

    const fallbackUsername = baseUsername || "user";

    let username = fallbackUsername;
    let suffix = 1;

    while (
      await prisma.user.findUnique({
        where: {
          username,
        },
      })
    ) {
      username = `${fallbackUsername}${suffix}`;
      suffix++;
    }

    return username;
  }
}

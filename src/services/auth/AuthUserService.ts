import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

interface AuthUserServiceProps {
  email: string;
  password: string;
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email ou senha incorretos");
    }

    const passwordMatch = await compare(password, user.passwordHash);

    if (!passwordMatch) {
      throw new Error("Email ou senha incorretos");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  }
}

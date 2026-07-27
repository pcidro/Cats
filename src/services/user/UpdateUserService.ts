import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import { Readable } from "stream";
import { cloudinary } from "../../config/cloudinary";

interface UpdateUserServiceProps {
  id: string;
  username?: string;
  imageBuffer?: Buffer;
  imageName?: string;
}

export class UpdateUserService {
  async execute({
    id,
    username,
    imageBuffer,
    imageName,
  }: UpdateUserServiceProps) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found!", 404);
    }

    let avatarUrlToUpdate = user.avatarUrl;

    if (imageBuffer && imageName) {
      try {
        const result = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "avatars",
              resource_type: "image",
              public_id: `${Date.now()}-${imageName.split(".")[0]}`,
            },
            (error, result) => {
              if (error) {
                reject(error);
              }
              resolve(result);
            },
          );
          const bufferStream = Readable.from(imageBuffer);
          bufferStream.pipe(uploadStream);
        });

        avatarUrlToUpdate = result.secure_url;
      } catch (error) {
        console.error("Error uploading avatar image:", error);
        throw new AppError("Error uploading avatar image", 500);
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username: username ?? user.username,
        avatarUrl: avatarUrlToUpdate,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }
}

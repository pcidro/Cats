import { Readable } from "stream";
import { cloudinary } from "../../config/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface UpdateCatServiceProps {
  id: string;
  ownerId: string;
  name?: string;
  bio?: string;
  birthDate?: Date | null;
  imageBuffer?: Buffer;
  imageName?: string;
}

export class UpdateCatService {
  async execute({
    id,
    ownerId,
    name,
    bio,
    birthDate,
    imageBuffer,
    imageName,
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

    let avatarUrlToUpdate = cat.avatarUrl;

    if (imageBuffer && imageName) {
      try {
        const result = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "cats",
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
        console.error("Error uploading cat image:", error);
        throw new AppError("Error uploading cat image to Cloudinary", 500);
      }
    }

    const updatedCat = await prisma.cat.update({
      where: {
        id,
      },
      data: {
        name: name ?? cat.name,
        bio: bio ?? cat.bio,
        birthDate: birthDate ?? cat.birthDate,
        avatarUrl: avatarUrlToUpdate,
      },
    });

    return updatedCat;
  }
}


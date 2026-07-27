import { Readable } from "stream";
import { cloudinary } from "../../config/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface CreateCatServiceProps {
  name: string;
  birthDate?: Date;
  bio?: string;
  ownerId: string;
  imageBuffer: Buffer;
  imageName: string;
}

export class CreateCatService {
  async execute({
    name,
    birthDate,
    bio,
    ownerId,
    imageBuffer,
    imageName,
  }: CreateCatServiceProps) {
    let bannerUrl = "";

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

      bannerUrl = result.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new AppError("Error uploading image to Cloudinary", 500);
    }

    const cat = await prisma.cat.create({
      data: {
        name,
        birthDate: birthDate ? new Date(birthDate) : null,
        bio,
        ownerId,
        avatarUrl: bannerUrl,
      },
    });

    return cat;
  }
}


import { Readable } from "stream";
import { cloudinary } from "../../config/cloudinary";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";

interface CreatePostServiceProps {
  caption: string;
  imageBuffer: Buffer;
  imageName: string;
  cat_id: string;
  author_id: string;
}

export class CreatePostService {
  async execute({
    caption,
    imageBuffer,
    imageName,
    cat_id,
    author_id,
  }: CreatePostServiceProps) {
    const cat = await prisma.cat.findFirst({
      where: {
        id: cat_id,
      },
    });

    if (cat?.id !== cat_id) {
      throw new AppError("Cat not found!", 404);
    }

    if (cat.ownerId !== author_id) {
      throw new AppError("You can only post your cats!", 403);
    }

    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "posts",
            resource_type: "image",
            public_id: `${Date.now()}-${imageName.split(".")[0]}`,
          },

          (error, result) => {
            if (error) {
              reject(error);
              return;
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

    const post = await prisma.post.create({
      data: {
        caption,
        catId: cat_id,
        authorId: author_id,
        imageUrl: bannerUrl,
      },
    });

    return post;
  }
}

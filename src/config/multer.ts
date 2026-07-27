import multer from "multer";
import { Request } from "express";

export default {
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    const allowedMimes = ["image/jpeg", "image/png"];

    if (allowedMimes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error("Formato de arquivo inválido. Permitido: .jpg, .jpeg e .png."),
    );
  },
};

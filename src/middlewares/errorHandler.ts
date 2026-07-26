import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  console.error("Internal Server Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}

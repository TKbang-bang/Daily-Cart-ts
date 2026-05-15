import { Request, Response, NextFunction } from "express";
import ServerError from "./serverError";

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ServerError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        about: err.about,
      },
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    error: {
      message: "Internal Server Error",
      about: "server error",
    },
  });
};

export default errorHandler;

import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import ServerError from "../../errors/serverError";

export const signupValidator =
  (schema: ZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req.body);

      req.body = result;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log({ error });
        return next(
          new ServerError(error.issues[0].message, "validation error", 400),
        );
      }

      next(error);
    }
  };

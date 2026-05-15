import { Request, Response, NextFunction } from "express";
import { signupService } from "./auth.service";
import { UserSignupSchema } from "./auth.schema";
import { UserSchema } from "../../types/user";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { sendingCookieToken } from "../../utils/cookies";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstname, lastname, email, password } =
      req.body as UserSignupSchema;

    const user: UserSchema = await signupService(
      firstname,
      lastname,
      email,
      password,
    );

    // creating tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    next(error);
  }
};

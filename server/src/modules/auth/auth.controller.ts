import { Request, Response, NextFunction } from "express";
import { signinService, signupService } from "./auth.service";
import { UserSigninSchema, UserSignupSchema } from "./auth.schema";
import { UserSchema } from "../../types/user";
import { createAccessToken, createRefreshToken } from "../../utils/token";
import { cookieOptions, sendingCookieToken } from "../../utils/cookies";

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

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body as UserSigninSchema;

    const user: UserSchema = await signinService(email, password);

    // creating tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    req.userID = null;
    res.clearCookie("refreshToken", cookieOptions);

    return res.status(201).end();
  } catch (error) {
    return next(error);
  }
};

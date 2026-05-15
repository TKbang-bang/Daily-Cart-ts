import { Response, CookieOptions } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30
};

export const sendingCookieToken = (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  return res
    .cookie("refreshToken", refreshToken, cookieOptions)
    .status(200)
    .json({
      success: true,
      data: { accessToken, message: "Account created successfully" },
    });
};

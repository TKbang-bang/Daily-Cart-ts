import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { createAccessToken, createRefreshToken } from "../utils/token";
import { cookieOptions } from "../utils/cookies";
import ServerError from "../errors/serverError";
import { UserID } from "../types/user";

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.cookies.refreshToken;

    if ((!accessToken || accessToken === "null") && !refreshToken) {
      return next(new ServerError("Unauthorized", "session", 401));
    }

    if (accessToken && accessToken !== "null") {
      try {
        const { userId } = jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRET!,
        ) as { userId: UserID };

        req.userID = userId;

        return next();
      } catch {}
    }

    if (refreshToken) {
      try {
        const { userId } = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET!,
        ) as { userId: UserID };

        const newAccess = createAccessToken(userId);
        const newRefresh = createRefreshToken(userId);

        res.cookie("refreshToken", newRefresh, cookieOptions);
        res.setHeader("access-token", `Bearer ${newAccess}`);

        req.userID = userId;

        return next();
      } catch {
        return next(new ServerError("Unauthorized", "session", 401));
      }
    }

    return next(new ServerError("Unauthorized", "session", 401));
  } catch (error) {
    next(error);
  }
};

export default sessionMiddleware;

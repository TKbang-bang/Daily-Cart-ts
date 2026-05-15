import jwt from "jsonwebtoken";
import { UserID } from "../types/user";

export const createAccessToken = (userId: UserID) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (userId: UserID) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "30d",
  });
};

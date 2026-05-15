import { Router, Request, Response } from "express";
import sessionMiddleware from "./middlewares/sessionHandler";

const protectedRoutes = Router();

protectedRoutes.get(
  "/api",
  sessionMiddleware,
  (_req: Request, res: Response) => {
    return res
      .status(201)
      .json({ success: true, data: { message: "Route is protected" } });
  },
);

export default protectedRoutes;

import { Router } from "express";
import { signupValidator } from "./auth.validator";
import { signinSchema, signupSchema } from "./auth.schema";
import {
  logoutController,
  signinController,
  signupController,
} from "./auth.controller";
import sessionMiddleware from "../../middlewares/sessionHandler";

const authRoutes = Router();

authRoutes.post("/signup", signupValidator(signupSchema), signupController);
authRoutes.post("/signin", signupValidator(signinSchema), signinController);
authRoutes.delete("/logout", sessionMiddleware, logoutController);
// authRoutes.post('/signin')

export default authRoutes;

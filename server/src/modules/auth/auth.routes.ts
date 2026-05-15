import { Router } from "express";
import { signupValidator } from "./auth.validator";
import { signupSchema } from "./auth.schema";
import { signupController } from "./auth.controller";

const authRoutes = Router();

authRoutes.post("/signup", signupValidator(signupSchema), signupController);
// authRoutes.post('/signin')

export default authRoutes;

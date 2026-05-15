import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import protectedRoutes from "./protected.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);

export default router;

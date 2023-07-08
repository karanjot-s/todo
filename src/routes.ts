import { Router } from "express";
import authRouter from "./auth/routes";
import todoRouter from "./todo/routes";
import { authenticateToken } from "./auth/jwt";

const router = Router();

router.use("", authRouter);
router.use("/todo", authenticateToken, todoRouter);

export default router;

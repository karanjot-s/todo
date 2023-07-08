import express from "express";
import { getAuthed, login, register } from "./controller";
import { authenticateToken } from "./jwt";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authenticateToken, getAuthed);

export default router;

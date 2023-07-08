import { Router } from "express";
import {
  checkTodo,
  createTodo,
  deleteTodo,
  getTodos,
  uncheckTodo,
  updateTodo,
} from "./controller";

const router = Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.put("/check/:id", checkTodo);
router.put("/uncheck/:id", uncheckTodo);

export default router;

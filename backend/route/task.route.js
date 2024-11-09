import { Router } from "express";
import {
  addtask,
  deletetask,
  gettasks,
  updatetask,
  getSingleTask,
} from "../controller/task.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

router.get("/", gettasks);
router.get("/:id", getSingleTask);
router.post("/", verifyToken, addtask);
router.put("/:id", verifyToken, updatetask);
router.delete("/:id", verifyToken, deletetask);

export default router;

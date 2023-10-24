import * as express from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();
export default router;
import {
  CreateTask,
  GetTasks,
  GetSingleTask,
  UpdateTask,
  DeleteTask,
} from "../controllers/taskController";

router.post("/", authMiddleware, CreateTask);
router.get("/", authMiddleware, GetTasks);
router.get("/:taskId", authMiddleware, GetSingleTask);
router.patch("/:taskId", authMiddleware, UpdateTask);
router.delete("/:taskId", authMiddleware, DeleteTask);

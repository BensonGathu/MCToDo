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

//  Create a new task. Authenticates the user using a JWT token.

router.post("/", authMiddleware, CreateTask);

//  Get a list of tasks. authMiddleware - Authenticates the user using a JWT token.

router.get("/", authMiddleware, GetTasks);

//  taskId - The ID of the task  - Authenticates the user using a JWT token.

router.get("/:taskId", authMiddleware, GetSingleTask);

/**
 Update a task by its ID.
 taskId - The ID of the task to update.
authMiddleware - Authenticates the user using a JWT token.
 */
router.put("/:taskId", authMiddleware, UpdateTask);

/**
 Delete a task by its ID.
 taskId - The ID of the task to delete.
 authMiddleware - Authenticates the user using a JWT token.
 */
router.delete("/:taskId", authMiddleware, DeleteTask);

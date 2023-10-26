import { NextFunction, Request, Response } from "express";

import TaskModel from "../models/taskModel";

// Create task
export const CreateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;
    const user_id = req.user.id;
    const newTask = new TaskModel({ title, description, status, user_id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Task creation failed" });
  }
};

// Retrieve All Tasks
export const GetTasks = async (req: Request, res: Response) => {
  try {
    const user_id = req.user.id;
    const tasks = await TaskModel.find({ user_id });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// Retrieve a Single Task
export const GetSingleTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const user_id = req.user.id;
    const task = await TaskModel.findOne({ _id: taskId, user_id });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching task" });
  }
};

// Update a Task
export const UpdateTask = async (req: Request, res: Response) => {
 
  
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const user_id = req.user.id;

    const task = await TaskModel.findOne({ _id: taskId, user_id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the task with the provided fields, if they exist
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete a Task
export const DeleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const user_id = req.user.id;

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: taskId,
      user_id,
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting task" });
  }
};

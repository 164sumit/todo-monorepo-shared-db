import express from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controller/task.controller";


const router = express.Router();

// POST /tasks: Create a new task
router.post("/task", createTask);

// GET /tasks: Fetch all tasks
router.post("/tasks", getAllTasks);

// GET /tasks/:id: Fetch a task by ID
router.get("/tasks/:id", getTaskById);

// PUT /tasks/:id: Update a task's status or owner
router.put("/tasks/:id", updateTask);


// DELETE /tasks/:id: Delete a task by ID
router.delete("/tasks/:id", deleteTask);

export default router;

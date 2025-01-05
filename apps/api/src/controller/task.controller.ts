import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId ,status} = req.body;
    console.log(req.body);
    

    if (!title || !description || !userId) {
      res.status(400).json({ error: "Title, description, and userId are required." });
      return 
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: Number(userId),
        status,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task." });
  }
};

// Fetch all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    console.log(req.body.userId);
    
    const tasks = await prisma.task.findMany({
        where:{
            userId:req.body.userId,
        },
      include: {
        user: true, // Include the user information
      },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
};

// Fetch a task by ID
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: {
        user: true, // Include the user information
      },
    });

    if (!task) {
       res.status(404).json({ error: "Task not found." });
       return
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task." });
  }
};

// Update a task's status or userId
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId, title, description,status } = req.body;
    console.log(req.body);
    

    const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];
    console.log(validStatuses);
    
    // if (status && !validStatuses.includes(status.toUpperCase())) {
    //    res.status(400).json({ error: "Invalid status value." });
    //    return
    // }

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        ...(status && { status: status?.toUpperCase()||validStatuses[0] }),
        ...(userId && { userId: Number(userId) }),
        ...(title && { title}),
        ...(description && { description})

      },
    });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task." });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({id});
    // return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task." });
  }
};
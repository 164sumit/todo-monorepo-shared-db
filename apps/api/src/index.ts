import express from "express";
import taskRoutes from "./routes/tasks.routes";
import { PrismaClient } from ".prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
import cors from 'cors';
app.use(cors({
  origin: "*"
}))

// Use task routes
app.post("/", async (req: express.Request, res: express.Response) => {
  const {name,email,password}=req.body;
  const user=await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  console.log("user created!!!");
  // res.send("Task created successfully");
  res.status(201).json({ message: "user created successfully" ,user});
  // res.status(201).json(req.body);
});
app.use("/api", taskRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
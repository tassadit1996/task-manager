import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import {
	deleteTask,
	getOneTask,
	getTasks,
	postTasks,
	updateTask,
} from "../controllers/taskController.js";

const taskRoutes = Router();

taskRoutes.post("/tasks", authenticateUser, postTasks);
taskRoutes.get("/tasks", authenticateUser, getTasks);

taskRoutes.put("/tasks/:id", authenticateUser, updateTask);

taskRoutes.delete("/tasks/:id", authenticateUser, deleteTask);

taskRoutes.get("/tasks/:id", authenticateUser, getOneTask);

export default taskRoutes;

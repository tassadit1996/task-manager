import { Router } from "express";
import { authenticateUser } from "../middleware/authenticateUser.js";
import {
	deleteTask,
	getCompletedTasks,
	getIncompletedTasks,
	getOneTask,
	getTasks,
	postTasks,
	updateTask,
} from "../controllers/taskController.js";

const taskRoutes = Router();

taskRoutes.post("/tasks", authenticateUser, postTasks);
taskRoutes.get("/tasks", authenticateUser, getTasks);

// get completed tasks
taskRoutes.get("/tasks/completed", authenticateUser, getCompletedTasks);

// get the incompleted tasks
taskRoutes.get("/tasks/incompleted", authenticateUser, getIncompletedTasks);

// update a task
taskRoutes.put("/tasks/:id", authenticateUser, updateTask);

// delete a task
taskRoutes.delete("/tasks/:id", authenticateUser, deleteTask);

// get a task
taskRoutes.get("/tasks/:id", authenticateUser, getOneTask);

export default taskRoutes;

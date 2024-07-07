import { Router } from "express";
import {
	getUser,
	login,
	logout,
	register,
} from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/user", getUser);

userRouter.post("/logout", logout);

export default userRouter;

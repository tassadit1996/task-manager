import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import userRouter from "./routes/authRoutes.js";

import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
import("./db/index.js");
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "jwt,Content-Type,Authorization",
	})
);

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", taskRoutes);
app.listen(process.env.PORT, () => {
	console.log(`✅ Server listening on port ${process.env.PORT}`);
});

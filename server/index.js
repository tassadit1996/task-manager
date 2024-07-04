import express from "express";
import "dotenv/config";
import router from "./routes/userRoute";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
import("./db");
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: "jwt,Content-Type,Authorization",
	})
);

app.use(express.json());
app.use("/api", router);
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});

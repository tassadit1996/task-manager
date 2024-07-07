import mongoose from "mongoose";
import "dotenv/config";
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("✅ Database connection successful");
	})
	.catch((err) => {
		console.error("❌ Database connection error:", err);
	});

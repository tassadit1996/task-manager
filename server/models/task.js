import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	description: {
		type: String,
		required: true,
		min: 6,
		max: 1024,
	},
	status: {
		type: Boolean,
		default: false,
	},
	creationDate: {
		type: Date,
		default: Date.now,
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

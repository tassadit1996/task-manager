import Task from "../models/task.js";

export const postTasks = async (req, res) => {
	try {
		const task = new Task({
			name: req.body.name,
			description: req.body.description,
			user: req.user._id,
		});

		const result = await task.save();
		res.status(200).json({
			message: "Tache crée avec succès",
			task: result,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user._id });
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getCompletedTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user._id, status: true });
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getIncompletedTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.user._id, status: false });
		res.status(200).send(tasks);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
export const updateTask = async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			user: req.user._id,
		});

		if (!task) {
			return res.status(404).json({ error: "Tache non trouvée" });
		}

		if (req.body.name) {
			task.name = req.body.name;
		}

		if (req.body.description) {
			task.description = req.body.description;
		}

		if (req.body.status) {
			task.status = req.body.status;
			task.completionDate = Date.now();
		}

		await task.save();
		res.status(200).json({
			message: "mis à jour effectuée avec succès",
			task,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			user: req.user._id,
		});
		await task.delete();
		res.status(200).json({ message: "Tache supprimée avec succès" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getOneTask = async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			user: req.user._id,
		});
		res.status(200).send(task);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

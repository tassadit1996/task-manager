import React, { useState } from "react";
import { createTask } from "../api/api";

interface NewTaskModalProps {
	onClose: () => void;
	onCreateTask: (taskData: { name: string; description: string }) => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({
	onClose,
	onCreateTask,
}) => {
	const [taskName, setTaskName] = useState("");
	const [taskDescription, setTaskDescription] = useState("");

	const handleCreateTask = async () => {
		if (taskName && taskDescription) {
			const taskData = {
				name: taskName,
				description: taskDescription,
			};
			try {
				await onCreateTask(taskData);
				onClose();
			} catch (error) {
				console.error("Error creating task:", error);
			}
		} else {
			console.error("Please enter valid task name and description");
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
			<div className="bg-white p-8 w-96 rounded-md">
				<h2 className="text-2xl font-bold mb-4">Nouvelle tache</h2>
				<label className="block mb-2">
					<span className="text-gray-700">Titre:</span>
					<input
						type="text"
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
						className="w-full mt-1 p-2 border rounded-md"
					/>
				</label>
				<label className="block mb-4">
					<span className="text-gray-700">Déscription:</span>
					<textarea
						value={taskDescription}
						onChange={(e) => setTaskDescription(e.target.value)}
						className="w-full mt-1 p-2 border rounded-md"
						rows={4}
					/>
				</label>
				<div className="flex justify-end">
					<button
						onClick={handleCreateTask}
						className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
					>
						Ajouter une tache
					</button>
					<button
						onClick={onClose}
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
					>
						Annuler
					</button>
				</div>
			</div>
		</div>
	);
};

export default NewTaskModal;

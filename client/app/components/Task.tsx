import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaTrash, FaCheck, FaPen, FaSave } from "react-icons/fa";

export interface TaskProps {
	_id: string;
	name: string;
	description: string;
	status: boolean;
	creationDate: string;
}

const Task: React.FC<{
	task: TaskProps;
	updateTaskStatus: (
		id: string,
		data: { status: boolean; tag: string }
	) => void;
	handleDeleteTask: (id: string) => void;
	handleUpdateTask: (
		id: string,
		data: { name: string; description: string }
	) => void;
}> = ({ task, updateTaskStatus, handleDeleteTask, handleUpdateTask }) => {
	const [isCompleted, setIsCompleted] = useState(task.status);
	const [editMode, setEditMode] = useState(false);
	const [updatedName, setUpdatedName] = useState(task.name);
	const [updatedDescription, setUpdatedDescription] = useState(
		task.description
	);

	const handleEdit = () => {
		setUpdatedName(task.name);
		setUpdatedDescription(task.description);
		setEditMode(true);
	};

	const handleSave = async () => {
		setEditMode(false);
		const data = {
			name: updatedName,
			description: updatedDescription,
		};

		try {
			await handleUpdateTask(task._id, data);
		} catch (error) {
			console.error("Error updating task:", error);
		}
	};

	useEffect(() => {
		setIsCompleted(task.status);
	}, [task.status]);

	return (
		<div className="p-6 rounded-lg shadow-md mb-4 flex-1 bg-white border border-gray-200 max-w-full">
			<div className="flex justify-between items-center mb-2">
				{editMode ? (
					<div className="flex flex-col gap-4 text-gray-800 max-w-full">
						<input
							type="text"
							value={updatedName}
							onChange={(e) => setUpdatedName(e.target.value)}
							className="text-lg font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
						/>
						<textarea
							value={updatedDescription}
							onChange={(e) =>
								setUpdatedDescription(e.target.value)
							}
							className="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
							style={{ maxHeight: "100px", overflowY: "auto" }}
						/>
					</div>
				) : (
					<div className="flex flex-col gap-4 text-gray-800 max-w-full">
						<h2
							className="text-lg font-semibold cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
							onClick={handleEdit}
						>
							{task.name}
						</h2>
						<p className="line-clamp-3" onClick={handleEdit}>
							{task.description}
						</p>
					</div>
				)}
				<div className="flex items-center space-x-3">
					{editMode && (
						<FaSave
							className=" text-blue-500 hover:text-blue-700 cursor-pointer"
							onClick={handleSave}
						/>
					)}
					{!editMode && (
						<label className="flex items-center cursor-pointer">
							<input
								type="checkbox"
								checked={isCompleted}
								onChange={() => {
									if (isCompleted) {
										updateTaskStatus(task._id, {
											status: false,
											tag: "incompleted",
										});
									} else {
										updateTaskStatus(task._id, {
											status: true,
											tag: "completed",
										});
									}
								}}
								className="hidden"
							/>
							<div
								className={`flex items-center justify-center w-6 h-6 border-2 rounded ${
									isCompleted
										? "bg-blue-600 border-blue-600"
										: "border-gray-300"
								}`}
							>
								{isCompleted && (
									<FaCheck className="text-white" />
								)}
							</div>
						</label>
					)}
					<FaPen
						className="cursor-pointer text-gray-500 hover:text-red-700"
						onClick={() => handleEdit()}
					/>
					<FaTrash
						className="cursor-pointer text-gray-500 hover:text-red-700"
						onClick={() => handleDeleteTask(task._id)}
					/>
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-center justify-between pt-2 border-t-2 border-gray-100 mt-2">
				<div className="flex items-center text-gray-500">
					<FaCalendarAlt className="mr-2" />
					<span>Crée le : {task.creationDate?.slice(0, 10)}</span>
				</div>
				{isCompleted ? (
					<div className="flex items-center text-gray-500 mt-2 md:mt-0">
						<span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
							Complétée
						</span>
					</div>
				) : (
					<div className="flex items-center text-gray-500 mt-2 md:mt-0">
						<span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
							Incomplétée
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;

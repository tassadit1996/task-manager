"use client";
import React, { useState, useEffect } from "react";
import withAuth from "../utils/withAuth";
import {
	createTask,
	deleteTask,
	getTasks,
	ToggleTaskCompleted,
	updateTask,
} from "../api/api";
import Task, { TaskProps } from "../components/Task";
import NewTaskModal from "../components/NewTaskModal";
import Sidebar from "../components/Sidebar";
import ResponsiveSidebar from "../components/ResponsiveSidebar";

const AllTasksPage: React.FC = () => {
	const [tasks, setTasks] = useState<TaskProps[] | undefined>();
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		try {
			const tasksData = await getTasks();
			if (tasksData.status === 200) {
				setTasks(tasksData.data);
			} else {
				console.error("erreur");
			}
		} catch (error) {
			console.error("Error", error);
		}
	};
	const completedTasks = async () => {
		try {
			const tasksData = await getTasks();
			const updatedTasks = tasksData.data!.filter(
				(task: TaskProps) => task.status == true
			);
			setTasks(updatedTasks);
		} catch (error) {
			console.error("Error", error);
		}
	};

	const inCompletedTasks = async () => {
		try {
			const tasksData = await getTasks();
			const updatedTasks = tasksData.data!.filter(
				(task: TaskProps) => task.status == false
			);
			setTasks(updatedTasks);
		} catch (error) {
			console.error("Error", error);
		}
	};

	const handleCreateTask = async (taskData: {
		name: string;
		description: string;
	}) => {
		try {
			const result = await createTask(taskData as TaskProps);
			if (result.status === 200) {
				const updatedTasks = [...(tasks as any)];
				updatedTasks.push(result.data.task);
				setTasks(updatedTasks);
			} else {
				console.error("Erreur");
			}
		} catch (error) {
			console.error("Error", error);
		}
	};

	const updateTaskStatus = async (
		taskId: string,
		status: { status: boolean }
	) => {
		try {
			const res = await ToggleTaskCompleted(taskId, {
				status: status as any,
			});
			if (res.status === 200) {
				const updatedTasks = tasks!.map((task) =>
					task._id === taskId
						? {
								...task,
								status,
						  }
						: task
				);
				setTasks(updatedTasks as TaskProps[]);
			} else {
				console.error("erreur");
			}
		} catch (error) {
			console.error(`Error:`, error);
		}
	};

	const handleUpdateTask = async (
		taskId: string,
		taskData: {
			name: string;
			description: string;
		}
	) => {
		try {
			const res = await updateTask(taskId, taskData as TaskProps);
			if (res.status === 200) {
				const updatedTasks = tasks!.map((task) =>
					task._id === taskId
						? {
								...task,
								name: taskData.name,
								description: taskData.description,
						  }
						: task
				);
				setTasks(updatedTasks as TaskProps[]);
			} else {
				console.error("erreur");
			}
		} catch (error) {
			console.error(`Error:`, error);
		}
	};

	const handleDeleteTask = async (id: string) => {
		try {
			const res = await deleteTask(id);
			if (res.status === 200) {
				const updatedTasks = tasks!.filter((task) => task._id !== id);
				setTasks(updatedTasks);
			}
		} catch (error) {
			console.error("Error", error);
		}
	};
	return tasks ? (
		<div className="p-10 flex gap-10 h-full transition-all duration-300 ease-in-out md:p-4 md:gap-4">
			<div className="hidden md:flex w-1/4">
				<Sidebar
					completedTasks={completedTasks}
					fetchTasks={fetchTasks}
					inCompletedTasks={inCompletedTasks}
				/>
			</div>
			<div className="md:hidden" id="__next">
				<ResponsiveSidebar
					completedTasks={completedTasks}
					fetchTasks={fetchTasks}
					inCompletedTasks={inCompletedTasks}
				/>
			</div>
			<div className="container mx-auto mt-20 mr-10">
				<div className="mb-20">
					<button
						className="rounded-lg float-end shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
						onClick={() => setIsModalOpen(true)}
					>
						Ajouter une tache
					</button>
				</div>

				{tasks.length === 0 ? (
					<div className="flex items-center justify-center">
						<div className="flex flex-col items-center pt-50">
							<p className="text-xl text-center my-36 text-gray-900">
								Vous n'avez aucune tache
							</p>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
						{tasks.map((task, index) => (
							<Task
								key={index}
								task={task}
								updateTaskStatus={updateTaskStatus as any}
								handleDeleteTask={handleDeleteTask}
								handleUpdateTask={handleUpdateTask}
							/>
						))}
					</div>
				)}

				{isModalOpen && (
					<NewTaskModal
						onClose={() => setIsModalOpen(false)}
						onCreateTask={handleCreateTask}
					/>
				)}
			</div>
		</div>
	) : (
		<div />
	);
};

export default withAuth(AllTasksPage);

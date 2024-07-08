"use client";
import React, { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../api/api";
import { usePathname, useRouter } from "next/navigation";
import {
	IoIosCheckboxOutline,
	IoIosSquareOutline,
	IoMdApps,
	IoIosLogOut,
} from "react-icons/io";
import { FaChartLine } from "react-icons/fa";

import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: React.FC<{
	completedTasks: () => void;
	fetchTasks: () => void;
	inCompletedTasks: () => void;
}> = ({ completedTasks, fetchTasks, inCompletedTasks }) => {
	const [active, setActive] = useState({
		all: true,
		completed: false,
		incompleted: false,
	});
	const path = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<>
			<div className="sidebar  flex flex-col justify-between border-gray-500 text-gray-700 m-5 p-5 rounded-lg border-1">
				<div className="text-center  sm:text-left mb-7 sm:mb-0 ">
					<a href="/">
						<div className="mb-28 flex gap-2 items-center sm:justify-start justify-center">
							<FontAwesomeIcon
								className={`bg-gradient-to-br from-blue-500 to-blue-500 p-3 text-sm h-[30px] text-white rounded-md`}
								icon={faList}
							/>
							<span className="text-2xl font-light">
								<span className="font-bold text-blue-500">
									Task-
								</span>
								Manager
							</span>
						</div>
					</a>
				</div>

				<div className="links flex flex-col justify-center mb-4">
					<button
						onClick={() => {
							fetchTasks();
							setActive({
								all: true,
								completed: false,
								incompleted: false,
							});
						}}
						className={` mb-3  rounded-lg flex gap-2 ${
							active.all
								? "bg-blue-500 text-white"
								: " text-gray-600"
						} px-6 py-3  font-medium  transition focus:outline-none hover:bg-blue-500 hover:text-white
						}`}
					>
						<IoMdApps className="w-6 h-6" />
						Toute les taches
					</button>
					<button
						onClick={() => {
							completedTasks();
							setActive({
								all: false,
								completed: true,
								incompleted: false,
							});
						}}
						className={`mb-3  rounded-lg flex gap-2 ${
							active.completed
								? "bg-blue-500 text-white"
								: " text-gray-700"
						} px-6 py-3  font-medium  transition focus:outline-none hover:bg-blue-500 hover:text-white
						}`}
					>
						<IoIosCheckboxOutline className="w-6 h-6 " />
						Complétées
					</button>
					<button
						onClick={() => {
							inCompletedTasks();
							setActive({
								all: false,
								completed: false,
								incompleted: true,
							});
						}}
						className={`mb-3  rounded-lg flex gap-2 ${
							active.incompleted
								? "bg-blue-500 text-white"
								: " text-gray-700"
						} px-6 py-3  font-medium  transition focus:outline-none hover:bg-blue-500 hover:text-white
						}`}
					>
						<IoIosSquareOutline className="w-6 h-6" />
						Incomplétées
					</button>
				</div>

				<div className="logout p-4">
					<button
						onClick={handleLogout}
						className="p-4  rounded-md flex gap-2 text-gray-700 hover:bg-blue-500 hover:text-white"
					>
						Se déconnecter{" "}
						<IoIosLogOut className="w-6 h-6 font-medium " />
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;

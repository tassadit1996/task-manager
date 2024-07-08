"use client";
import React, { useState } from "react";
import { IoMdApps } from "react-icons/io";
import ResponsiveSidebarModal from "./ResponsiveSideBarModal";

const ResponsiveSidebar: React.FC<{
	completedTasks: () => void;
	fetchTasks: () => void;
	inCompletedTasks: () => void;
}> = ({ completedTasks, fetchTasks, inCompletedTasks }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<button className="fixed top-4 left-4" onClick={openModal}>
				<IoMdApps className="w-8 h-8" />
			</button>

			<ResponsiveSidebarModal
				completedTasks={completedTasks}
				fetchTasks={fetchTasks}
				inCompletedTasks={inCompletedTasks}
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
			/>
		</>
	);
};

export default ResponsiveSidebar;

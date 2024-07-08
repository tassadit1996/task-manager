import React from "react";
import Modal from "react-modal";
import {
	IoMdApps,
	IoIosLogOut,
	IoIosCheckboxOutline,
	IoIosSquareOutline,
} from "react-icons/io";
import { useRouter } from "next/navigation";
import { logout } from "../api/api";

interface ResponsiveSidebarModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	completedTasks: () => void;
	fetchTasks: () => void;
	inCompletedTasks: () => void;
}

const ResponsiveSidebarModal: React.FC<ResponsiveSidebarModalProps> = ({
	isOpen,
	onRequestClose,
	completedTasks,
	fetchTasks,
	inCompletedTasks,
}) => {
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
		<Modal isOpen={isOpen} onRequestClose={onRequestClose}>
			<div className="links flex flex-col justify-center mb-4">
				<button
					onClick={() => {
						fetchTasks();
						onRequestClose();
					}}
					className={` mb-3  rounded-lg flex gap-2
					 px-6 py-3  font-medium  transition focus:outline-none 
						`}
				>
					<IoMdApps className="w-6 h-6" />
					Toutes les taches
				</button>
				<button
					onClick={() => {
						completedTasks();
						onRequestClose();
					}}
					className={`mb-3  rounded-lg flex gap-2
					 px-6 py-3  font-medium  transition focus:outline-none 
						`}
				>
					<IoIosCheckboxOutline className="w-6 h-6 " />
					Complétées
				</button>
				<button
					onClick={() => {
						inCompletedTasks();
						onRequestClose();
					}}
					className="mb-3 rounded-lg flex gap-2 
					px-6 py-3  font-medium  transition focus:outline-none 
						"
				>
					<IoIosSquareOutline className="w-6 h-6" />
					Incomplétées
				</button>
			</div>

			<div className="logout p-4">
				<button
					onClick={handleLogout}
					className="p-4  rounded-md flex gap-2 text-gray-700 "
				>
					Se déconnecter
					<IoIosLogOut className="w-6 h-6 font-medium " />
				</button>
			</div>
		</Modal>
	);
};

export default ResponsiveSidebarModal;

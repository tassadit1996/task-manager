// api.js
import axios from "axios";
import { TaskProps } from "../components/Task";

const url = process.env.API_URL;

export const login = async (email: string, password: string) => {
	try {
		const response = await axios.post(
			`${url}/login`,
			{ email, password },
			{ withCredentials: true }
		);
		return response;
	} catch (error) {
		console.error("Error during login:", error);
		return error;
	}
};

export const register = async (
	name: string,
	email: string,
	password: string
) => {
	const response = await axios.post(`${process.env.API_URL}/register`, {
		name,
		email,
		password,
	});
	return response;
};

export const isAuthenticated = async () => {
	const response = await axios.get(`${process.env.API_URL}/user`, {
		withCredentials: true,
	});
	return response.data;
};

export const isAuthenticatedUser = async () => {
	try {
		await axios.get(`${process.env.API_URL}/user`, {
			withCredentials: true,
		});
		return true;
	} catch (error) {
		return false;
	}
};

export const logout = async () => {
	const response = await axios.post(`${process.env.API_URL}/logout`, null, {
		withCredentials: true,
	});
	return response.data;
};

export const getTasks = async () => {
	const response = await axios.get(`${process.env.API_URL}/tasks`, {
		withCredentials: true,
	});
	return response;
};

export const getTask = async (id: string) => {
	const response = await axios.get(`${process.env.API_URL}/tasks/${id}`, {
		withCredentials: true,
	});
	return response;
};

export const createTask = async (task: TaskProps) => {
	const response = await axios.post(`${process.env.API_URL}/tasks`, task, {
		withCredentials: true,
	});
	return response;
};

export const updateTask = async (id: string, task: TaskProps) => {
	const response = await axios.put(
		`${process.env.API_URL}/tasks/${id}`,
		task,
		{
			withCredentials: true,
		}
	);
	return response;
};

export const deleteTask = async (id: string) => {
	const response = await axios.delete(`${process.env.API_URL}/tasks/${id}`, {
		withCredentials: true,
	});
	return response;
};

export const ToggleTaskCompleted = async (
	id: string,
	status: { status: boolean }
) => {
	const response = await axios.put(
		`${process.env.API_URL}/tasks/${id}`,
		status,
		{
			withCredentials: true,
		}
	);
	return response;
};

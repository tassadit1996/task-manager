import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const signUp = async (name: string, email: string, password: string) => {
	const response = await axios.post(`${API_URL}/signUp`, {
		name,
		email,
		password,
	});
	return response;
};
export const signIn = async (email: string, password: string) => {
	const response = await axios.post(`${API_URL}/signIn`, {
		email,
		password,
	});
	return response;
};

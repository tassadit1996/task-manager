"use client";
import React, { useEffect } from "react";
import { signUp } from "../api/api";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "module";

interface SignUpProps {
	onSignUp: (name: string, email: string, password: string) => void;
}

const page: React.FC<SignUpProps> = () => {
	const router = useRouter();

	const initialValues = {
		name: "",
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		password: Yup.string().required("Password is required"),
	});

	const onSubmit = async (values: typeof initialValues) => {
		const { name, email, password } = values;

		try {
			const response = await signUp(name, email, password);
			console.log(response);

			if (response.status === 201) {
				toast.success("Signup successful!");
				router.push("/signIn");
			} else if (response.status === 409) {
				toast.error("Email already exists!");
			} else {
				toast.error("Signup failed!");
			}
		} catch (error) {
			console.error("Error during signup:", error);
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error("Something went wrong!");
			}
		}
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center md:flex-row md:px-20">
				<div>
					<ToastContainer />
				</div>
				<div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-2/3 max-w-4xl">
					<div className="w-full md:w-3/5 p-5">
						<div className="text-left font-bold">
							<span className="text-blue-500">Task-</span>Manager
						</div>
						<div className="py-10">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{() => (
									<>
										<h2 className="text-3xl font-bold text-blue-500 mb-2">
											Inscription
										</h2>
										<div className="border-2 w-16 border-blue-500 inline-block mb-2"></div>

										<Form className="flex flex-col items-center">
											<div className="bg-gray-200 w-64 p-2 flex items-center rounded-xl mb-3">
												<FaRegUser className="text-gray-500 m-2" />
												<Field
													type="text"
													name="name"
													placeholder="Votre nom"
													className="bg-gray-200 outline-none text-sm flex-1"
												/>
												<ErrorMessage
													name="name"
													component="div"
													className="text-red-500 text-sm mt-1"
												/>
											</div>
											<div className="bg-gray-200 w-64 p-2 flex items-center rounded-xl mb-3">
												<FaRegEnvelope className="text-gray-500 m-2" />
												<Field
													type="email"
													name="email"
													placeholder="Adresse Email"
													className="bg-gray-200 outline-none text-sm flex-1"
												/>
												<ErrorMessage
													name="email"
													component="div"
													className="text-red-500 text-sm mt-1"
												/>
											</div>
											<div className="bg-gray-200 w-64 p-2 flex items-center rounded-xl mb-3">
												<MdLockOutline className="text-gray-500 m-2" />
												<Field
													type="password"
													name="password"
													placeholder="Mot de passe"
													className="bg-gray-200 outline-none text-sm flex-1"
												/>
												<ErrorMessage
													name="password"
													component="div"
													className="text-red-500 text-sm mt-1"
												/>
											</div>
											<button
												type="submit"
												className="border-2 border-blue-400 text-blue-400 rounded-full px-8 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-white"
											>
												S'inscrire
											</button>
										</Form>
									</>
								)}
							</Formik>
						</div>
					</div>
					<div className="w-full md:w-3/5 bg-blue-500 text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-12">
						<h1 className="text-3xl font-bold">Bonjour !</h1>
						<div className="border-2 w-10 border-white inline-block mb-2"></div>
						<p className="m-2 p-2">
							Si vous possédez déja un compte, Veuillez vous
							connecter !
						</p>
						<Link
							href="signIn"
							className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500 text-white"
						>
							Se connecter
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
};

export default page;

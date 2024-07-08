"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/api";
import withAuth from "../utils/withAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

interface LoginProps {
	onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = () => {
	const router = useRouter();

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("email invalid").required("champs requis"),
		password: Yup.string().required("champs requis"),
	});

	const onSubmit = async (values: typeof initialValues) => {
		const { email, password } = values;

		try {
			const response = (await login(email, password)) as any;

			if (response.status === 200) {
				router.push("/allTasks");
			} else {
				console.error("Connexion échouée");
			}
		} catch (error) {
			console.error("Erreur lors de la connexion", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
			<main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center md:flex-row md:px-20">
				<div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full md:w-2/3 max-w-4xl">
					<div className="w-full md:w-3/5 p-5">
						<div className="text-center  sm:text-left mb-7 sm:mb-0">
							<a href="/">
								<div className="flex gap-2 items-center sm:justify-start justify-center">
									<FontAwesomeIcon
										className={`bg-gradient-to-br from-blue-500 to-blue-500 p-3 text-sm h-[20px] text-white rounded-md`}
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
						<div className="py-10">
							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{() => (
									<>
										<h2 className="text-3xl font-bold text-blue-500 mb-2">
											Connexion
										</h2>
										<div className="border-2 w-16 border-blue-500 inline-block mb-2"></div>

										<Form className="flex flex-col items-center">
											<div className="bg-gray-200 w-64 p-2 flex items-center rounded-xl mb-3">
												<FaRegEnvelope className="text-gray-500 m-2" />
												<Field
													type="email"
													name="email"
													placeholder="Adresse Email"
													className="bg-gray-200 outline-none text-sm flex-1"
												/>
											</div>
											<ErrorMessage
												name="email"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
											<div className="bg-gray-200 w-64 p-2 flex items-center rounded-xl mb-3">
												<MdLockOutline className="text-gray-500 m-2" />
												<Field
													type="password"
													name="password"
													placeholder="Mot de passe"
													className="bg-gray-200 outline-none text-sm flex-1"
												/>
											</div>
											<ErrorMessage
												name="password"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
											<button
												type="submit"
												className="border-2 border-blue-400 text-blue-400 rounded-full px-8 py-2 inline-block font-semibold hover:bg-blue-400 hover:text-white"
											>
												Se connecter
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
							Remplissez vos informations personnelles pour vous
							inscrire.
						</p>
						<a
							href="register"
							className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500 text-white"
						>
							S'inscrire
						</a>
					</div>
				</div>
			</main>
		</div>
	);
};

export default withAuth(LoginPage);

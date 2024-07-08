"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../api/api";
import { FaRegUser, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

interface SignUpProps {
	onSignUp: (name: string, email: string, password: string) => void;
}

const SignUpPage: React.FC<SignUpProps> = () => {
	const router = useRouter();

	const initialValues = {
		name: "",
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string().required("champs requis"),
		email: Yup.string().email("email invalide").required("champs requis"),
		password: Yup.string().required("champs requis"),
	});

	const onSubmit = async (values: typeof initialValues) => {
		const { name, email, password } = values;

		try {
			const response = await register(name, email, password);

			if (response.status === 201) {
				router.push("/login");
			} else if (response.status === 409) {
				console.error("Email existe déja!");
			} else {
				console.error("Inscription échouée");
			}
		} catch (error) {
			console.error("Erreur lors de l'inscription", error);
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
											</div>
											<ErrorMessage
												name="name"
												component="div"
												className="text-red-500 text-sm mt-1"
											/>
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
						<a
							href="login"
							className="border-2 border-white rounded-full px-8 py-2 inline-block font-semibold hover:bg-white hover:text-blue-500 text-white"
						>
							Se connecter
						</a>
					</div>
				</div>
			</main>
		</div>
	);
};

export default SignUpPage;

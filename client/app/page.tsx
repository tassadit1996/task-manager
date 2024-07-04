"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Home() {
	return (
		<div className="poppins h-[1000px] bg-slate-50">
			<TaskifyHeader />
			<CTASection />
			<AppImage />
		</div>
	);
}

function TaskifyHeader() {
	const userId = false;
	return (
		<header>
			<div className=" p-8 px-20  ">
				<div className="sm:flex sm:items-center sm:justify-between ">
					<div className="text-center  sm:text-left mb-7 sm:mb-0">
						<div className="flex gap-2 items-center sm:justify-start justify-center">
							<FontAwesomeIcon
								className={`bg-gradient-to-br from-mainColor to-blue-500 p-3 text-sm h-[30px] text-white rounded-md`}
								icon={faList}
							/>
							<span className="text-2xl font-light">
								<span className="font-bold text-mainColor">
									Task-
								</span>
								Manager
							</span>
						</div>
					</div>

					<div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
						{userId ? (
							<Link href="/project">
								<button
									className={`block rounded-lg bg-gradient-to-br from-mainColor to-blue-500 px-9 py-3 text-sm font-medium text-white transition   focus:outline-none  `}
									type="button"
								>
									Tableau de bord
								</button>
							</Link>
						) : (
							<>
								<Link href="/signIn">
									<button
										className={`block sm:w-32 w-full rounded-lg bg-gradient-to-br from-mainColor to-blue-500 px-9 py-3 text-sm font-medium text-white transition   focus:outline-none  `}
										type="button"
									>
										Sign In
									</button>
								</Link>

								<Link href="/signUp">
									<button
										className={`block rounded-lg border border-mainColor 
               text-mainColor px-9 py-3 text-sm font-medium 
               transition focus:outline-none sm:w-32 w-full
               to-mainColor hover:to-transparent hover:from-mainColor`}
										type="button"
									>
										Sign Up
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

function CTASection() {
	return (
		<div className="flex flex-col mx-16 items-center mt-[100px] gap-6 ">
			<h2 className="font-bold text-3xl text-center">
				Déverrouillez votre productivité dès aujourd'hui !
			</h2>
			<p className="text-center text-sm w-[450px] ">
				Bienvenue sur Task-manager ! Organisez facilement vos tâches,
				suivez vos progrès et augmentez votre productivité. Dites adieu
				au chaos, bonjour à l'efficacité. Commencez dès maintenant !
			</p>
			<Link href={"/signIn"}>
				<button
					className={`block text-sm font-light rounded-lg bg-gradient-to-br from-mainColor to-blue-500 px-9 py-3 text-sm font-medium text-white transition   focus:outline-none  `}
					type="button"
				>
					{`C'est parti !`}
				</button>
			</Link>
		</div>
	);
}

function AppImage() {
	return (
		<div className="flex w-full justify-center mt-20">
			{/* <Image
				alt="dashboard"
				width={700}
				height={300}
				className="shadow-xl aspect-auto sm:w-full w-[398px]  rounded-lg max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
			/> */}
		</div>
	);
}

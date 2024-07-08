// next.config.mjs
import "dotenv/config";

export default {
	reactStrictMode: true,
	env: {
		API_URL: process.env.API_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
};

import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "dotenv/config";

export const authenticateUser = async (req, res, next) => {
	try {
		const cookie = req.cookies["jwt"];
		const claims = jwt.verify(cookie, process.env.JWT_TOKEN);

		if (!claims) {
			return res.status(401).json({ message: "Not authenticated" });
		}
		const user = await User.findOne({ _id: claims.id, name: claims.name });

		if (!user) {
			return res.status(401).json({ message: "Not authenticated" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ message: "Not authenticated" });
	}
};

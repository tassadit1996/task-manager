import bcrypt from "bcryptjs";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
	try {
		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return res
				.status(409)
				.json({ message: "Email is already registered" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});

		const result = await user.save();

		const { password, ...savedUser } = await result.toJSON();

		res.status(201).send(savedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const signIn = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(404).json({ error: "user not found" });
	}
	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!validPassword) {
		return res.status(404).json({ error: "Password is not correct" });
	}

	const token = jwt.sign(
		{ id: user._id, name: user.name },
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
	);

	res.setHeader("Set-Cookie", `jwt=${token}; path=/; HttpOnly`);

	res.status(200).json({ message: "Login successful" });
};

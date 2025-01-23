const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: newUser._id,
            role: newUser.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, {
            expiresIn: "1h"
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
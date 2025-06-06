import db from  '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Op } from 'sequelize'; 
const User = db.User;
 


//  User Register Function
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashed });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Login Function
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ message: "Incorrect Password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Login Successful", token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//  Reset Password Request
export const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const token = crypto.randomBytes(32).toString("hex");
        const expiry = Date.now() + 60 * 60 * 1000;

        user.resetToken = token;
        user.resetTokenExpiry = expiry;
        await user.save();

        sendEmail(email, token);

        res.json({ message: "Reset link sent to your email." });

    } catch (error) {
        console.error("Reset password request error:", error);
        res.status(500).json({ message: error.message });
    }
};


//  Set New Password
export const setNewPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    [Op.gt]: Date.now()
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null;
        user.resetTokenExpiry = null;

        await user.save();

        res.json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

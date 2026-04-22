import bcrypt from 'bcrypt'
import { createUser, findUserByEmail } from '../models/userModel.js'
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await createUser(email, hashedPassword)
        res.status(201).json({ message: "User created", user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email)

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.status(200).json({ message: "Login successfull", token, userId: user.id })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
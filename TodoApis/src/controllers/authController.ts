import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../models/userModel";
const revokedTokens = new Set();

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Generate a user ID (Unique identifier)
function generateId() {
  return "USR" + Math.random().toString(36).substr(2, 6);
}

export const registerUser = async (req: Request, res: Response) => {
  const userID = generateId(); // Generate the user ID

  try {
    const { first_name, last_name, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the Mongoose User model
    const newUser = new User({
      userID: userID,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      username: email.split("@")[0],
    });

    await newUser.save();

    const token = signToken(newUser.id);

    // Respond with the user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    } 
    // Generate a JWT token for the authenticated user
    const token = signToken(user.id);

    // Respond with the user and token
    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {

  revokedTokens.add(req.token);

  res.json({ message: "Logout successful" });
};

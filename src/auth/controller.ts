import { Request, Response } from "express";
import User, { UserInterface } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createJWT, verifyToken } from "./jwt";

interface rUserInterface {
  userId: string;
  username: string;
  duration: number;
  iat: number;
  exp: number;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const existingUser: UserInterface | null = await User.findOne({ username });

    if (existingUser) {
      res.status(400).json({ error: "Username already in use" });
      return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: UserInterface = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ error: "Invalid username" });
      return;
    }

    const isValidPassword: boolean = await bcrypt.compare(
      password,
      user.password
    );

    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token: string = createJWT(user.username, user._id, 3600);
    const decodedToken = verifyToken(token);
    if (!decodedToken) throw "Token decode failed";
    res.status(200).json({ token, ...user.toJSON() });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAuthed = async (req: Request, res: Response) => {
  const { userId } = req.user as rUserInterface;

  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Could not find user" });
  }
};

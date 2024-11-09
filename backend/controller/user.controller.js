import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPwd,
      },
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Failed to register", error);
    res.status(404).json({ message: "Failed to register" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userByUsername = await prisma.user.findUnique({
      where: { email },
    });

    if (!userByUsername) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, userByUsername.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      { id: userByUsername.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successfully" });
  } catch (error) {
    console.log("Failed to login", error);
    res.status(404).json({ message: "Failed to login" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Failed to logout");
    res.status(404).json({ message: "Failed to logout" });
  }
};

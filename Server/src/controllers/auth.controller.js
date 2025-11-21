import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECURITY_KEY = process.env.JWT_SECRET || "soham@33"; // move to .env later

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name,
  email,
  password,
  gender,
  dateOfBirth,
  height,
  weight,
  fitnessLevel,
  goal,
  workoutPreference,
  bodyFat,
  dailyActivityLevel } = req.body;

    if (!name || !email || !password || !gender ||!dateOfBirth || !height
      || !weight || !fitnessLevel || !goal || !workoutPreference || !dailyActivityLevel
    )
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

const newUser = new User({
      name,
      email,
      password: hashPassword,
      gender,
      dateOfBirth,
      height,
      weight,
      fitnessLevel,
      goal,
      workoutPreference,
      bodyFat: bodyFat || null,
      dailyActivityLevel: dailyActivityLevel || "sedentary",
    });    await newUser.save();

    return res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, JWT_SECURITY_KEY, { expiresIn: "24h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

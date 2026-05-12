import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import FitnessProfile from "../models/FitnessProfile.js";
import { getJwtSecret } from "../utils/jwt.js";

const adminSeedProfile = {
  gender: "other",
  dateOfBirth: new Date("1990-01-01"),
  height: 170,
  weight: 70,
  fitnessLevel: "advanced",
  goal: "strength",
  workoutPreference: "both",
  bodyFat: null,
  dailyActivityLevel: "active",
};

const getAdminBootstrap = () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return null;
  return {
    email,
    password,
    name: process.env.ADMIN_NAME?.trim() || "Fitlife Admin",
  };
};

const isAdminBootstrapAttempt = (email, password) => {
  const admin = getAdminBootstrap();
  if (!admin) return false;

  return email?.trim().toLowerCase() === admin.email && password === admin.password;
};

const ensureBootstrapAdmin = async (email, password, existingUser = null) => {
  if (!isAdminBootstrapAttempt(email, password)) return existingUser;

  const admin = getAdminBootstrap();
  const hashPassword = await bcrypt.hash(admin.password, 10);

  if (!existingUser) {
    const user = new User({
      ...adminSeedProfile,
      name: admin.name,
      email: admin.email,
      password: hashPassword,
      role: "admin",
      isPremium: true,
    });

    await user.save();
    return user;
  }

  let changed = false;
  if (existingUser.role !== "admin") {
    existingUser.role = "admin";
    changed = true;
  }

  if (!existingUser.isPremium) {
    existingUser.isPremium = true;
    changed = true;
  }

  const passwordMatches = await bcrypt.compare(admin.password, existingUser.password);
  if (!passwordMatches) {
    existingUser.password = hashPassword;
    changed = true;
  }

  if (changed) await existingUser.save();
  return existingUser;
};

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

    return res.status(201).json({
      message: "User registered successfully!",
      profileComplete: false,
      isPremium: false,
    });

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

    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    user = await ensureBootstrapAdmin(normalizedEmail, password, user);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const profile = user.role === "admin" ? null : await FitnessProfile.findOne({ userId: user._id });
    const profileComplete = user.role === "admin" || Boolean(profile?.completedAt);
    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "24h" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: Boolean(user.isPremium),
        profileComplete,
      },
      profileComplete,
      isPremium: Boolean(user.isPremium),
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

import User from "../models/User.js";
import FitnessProfile from "../models/FitnessProfile.js";
import { validateProfileInput } from "../services/aiPlanValidator.js";

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "";
  const dob = new Date(dateOfBirth);
  const diff = Date.now() - dob.getTime();
  return Math.abs(new Date(diff).getUTCFullYear() - 1970);
};

const buildSeedProfile = (user) => ({
  physical: {
    age: calculateAge(user.dateOfBirth),
    gender: user.gender || "",
    height: user.height || "",
    weight: user.weight || "",
    bodyFat: user.bodyFat || null,
  },
  biological: {
    activityLevel: user.dailyActivityLevel || "sedentary",
    sleepHours: "",
    restingHeartRate: null,
  },
  medical: {
    injuries: [],
    chronicConditions: [],
    medications: [],
    notes: "",
  },
  trainingHistory: {
    yearsTraining: user.fitnessLevel === "advanced" ? 3 : user.fitnessLevel === "intermediate" ? 1 : 0,
    currentWorkoutType: user.workoutPreference || "both",
    weeklyFrequency: "",
    recentTrainingNotes: "",
  },
  goals: {
    primary: user.goal || "",
    secondary: [],
    targetTimeline: "",
    motivation: "",
  },
  preferences: {
    location: user.workoutPreference || "both",
    equipment: user.workoutPreference === "gym" ? ["gym equipment"] : ["bodyweight"],
    duration: "",
    intensity: user.fitnessLevel || "",
    workoutDays: [],
  },
});

export const getAllUsers = async (_req, res) => {
  try {
    // Exclude password for security
    const users = await User.find().select("-password");
    const totalUsers = await User.countDocuments();

    return res.status(200).json({
      success: true,
      totalUsers,
      users,
    });

  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await FitnessProfile.findOne({ userId: req.user._id });
    const user = req.user.toObject ? req.user.toObject() : req.user;

    return res.status(200).json({
      success: true,
      user: {
        ...user,
        profileComplete: Boolean(profile?.completedAt),
        isPremium: Boolean(user.isPremium),
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFitnessProfile = async (req, res) => {
  try {
    const profile = await FitnessProfile.findOne({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      profileComplete: Boolean(profile?.completedAt),
      profile: profile || buildSeedProfile(req.user),
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateFitnessProfile = async (req, res) => {
  try {
    const profilePayload = validateProfileInput(req.body);
    const profile = await FitnessProfile.findOneAndUpdate(
      { userId: req.user._id },
      { ...profilePayload, userId: req.user._id },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      profileComplete: true,
      profile,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid personalization profile",
      details: err.errors || err.message,
    });
  }
};

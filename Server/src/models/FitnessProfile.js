import mongoose from "mongoose";

const fitnessProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
      unique: true,
      index: true,
    },
    physical: {
      age: Number,
      gender: String,
      height: Number,
      weight: Number,
      bodyFat: Number,
    },
    biological: {
      bmi: Number,
      activityLevel: String,
      sleepHours: Number,
      restingHeartRate: Number,
    },
    medical: {
      injuries: [{ type: String }],
      chronicConditions: [{ type: String }],
      medications: [{ type: String }],
      notes: String,
    },
    trainingHistory: {
      yearsTraining: Number,
      currentWorkoutType: String,
      weeklyFrequency: Number,
      recentTrainingNotes: String,
    },
    goals: {
      primary: String,
      secondary: [{ type: String }],
      targetTimeline: String,
      motivation: String,
    },
    preferences: {
      location: {
        type: String,
        enum: ["home", "gym", "both"],
        default: "both",
      },
      equipment: [{ type: String }],
      duration: Number,
      intensity: String,
      workoutDays: [{ type: String }],
    },
    completedAt: Date,
  },
  { timestamps: true }
);

const FitnessProfile = mongoose.model("FitnessProfile", fitnessProfileSchema);
export default FitnessProfile;

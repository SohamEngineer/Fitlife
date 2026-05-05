import mongoose from "mongoose";

const aiPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
      index: true,
    },
    version: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      enum: ["claude", "mock"],
      default: "claude",
    },
    isCurrent: {
      type: Boolean,
      default: true,
      index: true,
    },
    profileSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    assessment: {
      summary: String,
      readinessScore: Number,
      trainingLoad: String,
      planStyle: String,
    },
    weeklyPlan: [
      {
        day: String,
        focus: String,
        duration: Number,
        intensity: String,
        exercises: [
          {
            title: String,
            sets: Number,
            reps: String,
            restSec: Number,
            notes: String,
            source: {
              type: String,
              enum: ["fitlife_library", "ai_fallback"],
              default: "ai_fallback",
            },
            workoutId: String,
            workoutLocation: String,
            videoAvailable: Boolean,
          },
        ],
      },
    ],
    dietaryTips: [{ type: String }],
    warnings: [{ type: String }],
    rawResponse: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

aiPlanSchema.index({ userId: 1, version: -1 });

const AIPlan = mongoose.model("AIPlan", aiPlanSchema);
export default AIPlan;

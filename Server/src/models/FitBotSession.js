import mongoose from "mongoose";

const fitBotSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewUser",
      required: true,
      index: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AIPlan",
    },
    workoutContext: mongoose.Schema.Types.Mixed,
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const FitBotSession = mongoose.model("FitBotSession", fitBotSessionSchema);
export default FitBotSession;

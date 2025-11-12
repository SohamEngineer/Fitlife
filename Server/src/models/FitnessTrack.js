import mongoose from "mongoose";

const FitnessTrackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NewUser", // reference to the user schema
    required: true
  },
  workout_name: String,
  activity: String,
  weight: Number,
  fat: Number,
  bmi: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const FitnessTrack = mongoose.model("Fitnesstrack", FitnessTrackSchema);
export default FitnessTrack;

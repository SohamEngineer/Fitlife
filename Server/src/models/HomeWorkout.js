// Server/mongoSchema/addHomeWorkout.js
import mongoose from "mongoose";

const homeWorkoutSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  day:{type:String,required:true},
  caloryburn: { type: Number, required: true },
  video: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const AddHomeWorkout = mongoose.model("homeworkout", homeWorkoutSchema);
export default AddHomeWorkout;

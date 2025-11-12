import fs from "fs";
import path from "path";
import AddGymWorkout from "../models/GymWorkout.js";

// ----------------------
// Get All Gym Workouts
// ----------------------
export const getAllGymWorkouts = async (req, res) => {
  try {
    const workouts = await AddGymWorkout.find();

    const withVideos = workouts.map((workout) => {
      const filename = workout.video?.replace(/^gymphoto[\\/]/, "");
      const videoPath = path.join("gymphoto", filename);

      let base64 = "";
      try {
        base64 = fs.readFileSync(videoPath, { encoding: "base64" });
      } catch (err) {
        console.error("Error reading gym video:", videoPath, err);
      }

      return {
        ...workout._doc,
        videoBase64: `data:video/mp4;base64,${base64}`,
      };
    });

    return res.status(200).json(withVideos);

  } catch (error) {
    console.error("GymWorkout Fetch Error:", error);
    return res.status(500).json({ message: "Error fetching workouts" });
  }
};

// ----------------------
// Get Workout By ID
// ----------------------
export const getGymWorkoutById = async (req, res) => {
  try {
    const workout = await AddGymWorkout.findById(req.params.id);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const filename = workout.video?.replace(/^gymphoto[\\/]/, "");
const videoPath = path.join(process.cwd(), "src", "gymphoto", filename);

    let base64 = "";
    try {
      base64 = fs.readFileSync(videoPath, { encoding: "base64" });
    } catch (err) {
      console.error("Error reading gym video:", videoPath, err);
    }

    return res.status(200).json({
      ...workout._doc,
      videoBase64: `data:video/mp4;base64,${base64}`,
    });

  } catch (error) {
    return res.status(500).json({ message: "Workout not found" });
  }
};

// ----------------------
// Add New Gym Workout
// ----------------------
export const addGymWorkout = async (req, res) => {
  try {
    const { title, type, day, description, caloryburn } = req.body;
    const video = req.file?.filename;

    if (!title || !type || !day || !description || !caloryburn || !video) {
      return res.status(400).json({ message: "All fields including video are required" });
    }

    const newWorkout = new AddGymWorkout({
      title,
      type,
      day,
      description,
      caloryburn,
      video,
    });

    await newWorkout.save();

    return res.status(201).json({ message: "Gym workout added successfully" });

  } catch (error) {
    console.error("GymWorkout Add Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

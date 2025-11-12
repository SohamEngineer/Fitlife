import fs from "fs";
import path from "path";
import AddHomeWorkout from "../models/HomeWorkout.js";

// ----------------------
// Get All Home Workouts
// ----------------------
export const getAllHomeWorkouts = async (req, res) => {
  try {
    // Fetch all workouts from DB
    const workouts = await AddHomeWorkout.find();

    // Convert each workout video to Base64 for sending to frontend
    const withVideos = workouts.map((workout) => {
      // Remove "uploads/" from video path if exists
      const filename = workout.video?.replace(/^uploads[\\/]/, "");
      const videoPath = path.join("uploads", filename);

      let base64 = "";
      try {
        // Read video file & convert to base64
        base64 = fs.readFileSync(videoPath, { encoding: "base64" });
      } catch (err) {
        console.error("Error reading video:", videoPath, err);
      }

      // Return modified workout object with base64 video
      return {
        ...workout._doc,
        videoBase64: `data:video/mp4;base64,${base64}`,
      };
    });

    return res.status(200).json(withVideos);

  } catch (err) {
    console.error("HomeWorkout Fetch Error:", err);
    return res.status(500).json({ message: "Error fetching workouts" });
  }
};

// ----------------------
// Get Workout By ID
// ----------------------
export const getHomeWorkoutById = async (req, res) => {
  try {
    // Find workout based on ID in URL
    const workout = await AddHomeWorkout.findById(req.params.id);

    if (!workout) return res.status(404).json({ message: "Workout not found" });

    const filename = workout.video?.replace(/^uploads[\\/]/, "");
    const videoPath = path.join("uploads", filename);

    let base64 = "";
    try {
      base64 = fs.readFileSync(videoPath, { encoding: "base64" });
    } catch (err) {
      console.error("Error reading video:", videoPath, err);
    }

    return res.status(200).json({
      ...workout._doc,
      videoBase64: `data:video/mp4;base64,${base64}`,
    });

  } catch (err) {
    return res.status(500).json({ message: "Workout not found" });
  }
};

// ----------------------
// Add New Workout (with Video)
// ----------------------
export const addHomeWorkout = async (req, res) => {
  try {
    const { title, type, day, description, caloryburn } = req.body;
    const video = req.file?.filename; // File uploaded via multer middleware

    // Validate required fields
    if (!title || !type || !day || !description || !caloryburn || !video) {
      return res.status(400).json({ message: "All fields including video are required" });
    }

    // Save workout in DB
    const newWorkout = new AddHomeWorkout({
      title,
      type,
      day,
      description,
      caloryburn,
      video,
    });

    await newWorkout.save();

    return res.status(201).json({ message: "Workout added successfully" });

  } catch (error) {
    console.error("HomeWorkout Add Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};



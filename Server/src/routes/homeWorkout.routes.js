import express from "express";
import { getAllHomeWorkouts, getHomeWorkoutById, addHomeWorkout } from "../controllers/homeWorkout.controller.js";
import { homeUpload } from "../middlewares/upload.middleware.js";

const homeRoute = express.Router();

// Get all Home Workouts
homeRoute.get("/", getAllHomeWorkouts);

// Get single workout by ID
homeRoute.get("/:id", getHomeWorkoutById);

// Add new workout (upload.single("video") → expecting `video` field in form-data)
homeRoute.post("/add", homeUpload.single("video"), addHomeWorkout);


export default homeRoute;

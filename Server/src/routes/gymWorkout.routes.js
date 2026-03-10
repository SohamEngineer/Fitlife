import express from "express";
import { getAllGymWorkouts, getGymWorkoutById, addGymWorkout } from "../controllers/gymWorkout.controller.js";
import { gymUpload } from "../middlewares/upload.middleware.js";

const gymWorkoutRoutes = express.Router();

gymWorkoutRoutes.get("/", getAllGymWorkouts);
gymWorkoutRoutes.get("/:id", getGymWorkoutById);
gymWorkoutRoutes.post("/add", gymUpload.single("video"), addGymWorkout);

export default gymWorkoutRoutes;

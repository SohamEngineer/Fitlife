import express from "express";
import {
  deleteHomeWorkout,
  updateHomeWorkout,
  deleteGymWorkout,
  updateGymWorkout,
} from "../controllers/admin.controller.js";

import { homeUpload, gymUpload } from "../middlewares/upload.middleware.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const adminRoutes = express.Router();

// Admin guard for everything under /api/admin
adminRoutes.use(requireAuth, requireAdmin);



// Home workouts
adminRoutes.delete("/homeworkout/:id", deleteHomeWorkout);
adminRoutes.put("/homeworkout/:id", homeUpload.single("video"), updateHomeWorkout);

// Gym workouts
adminRoutes.delete("/gymworkout/:id", deleteGymWorkout);
adminRoutes.put("/gymworkout/:id", gymUpload.single("video"), updateGymWorkout);

export default adminRoutes;

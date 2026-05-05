import express from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getWorkoutCatalog } from "../services/workoutMatcher.js";

const workoutCatalogRoutes = express.Router();

workoutCatalogRoutes.get("/catalog", requireAuth, async (req, res) => {
  try {
    const location = ["home", "gym", "both"].includes(req.query.location) ? req.query.location : "both";
    const workouts = await getWorkoutCatalog(location);

    return res.status(200).json({
      success: true,
      workouts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load workout catalog",
    });
  }
});

export default workoutCatalogRoutes;

import express from "express";
import { getFitnessData, addFitnessData } from "../controllers/fitness.controller.js";

const fitnessRoutes = express.Router();

// Get records for a specific user
fitnessRoutes.get("/:userId", getFitnessData);

// Add new fitness entry
fitnessRoutes.post("/", addFitnessData);

export default fitnessRoutes;

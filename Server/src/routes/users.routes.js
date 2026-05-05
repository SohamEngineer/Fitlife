import express from "express";
import { getAllUsers, getFitnessProfile, getMyProfile, updateFitnessProfile } from "../controllers/user.controller.js";
import { requireAdmin, requireAuth } from "../middlewares/auth.middleware.js";

const fetchUser = express.Router();

fetchUser.get("/", requireAuth, requireAdmin, getAllUsers);
fetchUser.get("/me", requireAuth, getMyProfile);
fetchUser.get("/me/profile", requireAuth, getFitnessProfile);
fetchUser.put("/me/profile", requireAuth, updateFitnessProfile);

export default fetchUser;

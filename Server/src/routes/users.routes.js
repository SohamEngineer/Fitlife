import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const fetchUser = express.Router();

// GET /api/users
fetchUser.get("/", getAllUsers);

export default fetchUser;

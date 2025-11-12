import express from "express";
import { sendOtp, verifyOtp, resetPassword } from "../controllers/password.controller.js";

const passwordRoutes  = express.Router();

passwordRoutes .post("/send-otp", sendOtp);
passwordRoutes .post("/verify-otp", verifyOtp);
passwordRoutes .post("/reset-password", resetPassword);

export default passwordRoutes ;

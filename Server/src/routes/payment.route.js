import express from "express";
import { activatePrime } from "../controllers/payment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const paymentRoutes = express.Router();

// activate premium after payment
paymentRoutes.post("/activate", requireAuth, activatePrime);

export default paymentRoutes;

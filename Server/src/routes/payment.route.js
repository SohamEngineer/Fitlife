import express from "express";
import { activatePrime } from "../controllers/payment.controller.js";

const paymentRoutes = express.Router();

// activate premium after payment
paymentRoutes.post("/activate", activatePrime);

export default paymentRoutes;
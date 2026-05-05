import express from "express";
import AIPlan from "../models/AIPlan.js";
import FitnessProfile from "../models/FitnessProfile.js";
import FitBotSession from "../models/FitBotSession.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { generateFitnessPlan, streamFitBotResponse } from "../services/claudeService.js";
import { validateAIPlan } from "../services/aiPlanValidator.js";
import { attachWorkoutMatches, getWorkoutCatalog } from "../services/workoutMatcher.js";

const aiRoutes = express.Router();

const loadCompletedProfile = async (userId) => {
  const profile = await FitnessProfile.findOne({ userId }).lean();
  if (!profile?.completedAt) {
    const error = new Error("Complete onboarding before generating an AI plan.");
    error.status = 400;
    throw error;
  }
  return profile;
};

aiRoutes.post("/plans", requireAuth, async (req, res) => {
  try {
    const profile = await loadCompletedProfile(req.user._id);
    const existingPlans = await AIPlan.countDocuments({ userId: req.user._id });

    if (existingPlans > 0 && !req.user.isPremium) {
      return res.status(402).json({
        success: false,
        message: "Upgrade to premium to regenerate AI plans.",
      });
    }

    const catalog = await getWorkoutCatalog(profile.preferences?.location || "both");
    const generated = await generateFitnessPlan({ profile, catalog });
    const validated = validateAIPlan(generated.plan);
    const matchedPlan = attachWorkoutMatches(validated, catalog, profile);
    const latestPlan = await AIPlan.findOne({ userId: req.user._id }).sort({ version: -1 }).lean();
    const version = (latestPlan?.version || 0) + 1;

    await AIPlan.updateMany({ userId: req.user._id }, { isCurrent: false });

    const plan = await AIPlan.create({
      userId: req.user._id,
      version,
      model: generated.model,
      source: generated.source,
      isCurrent: true,
      profileSnapshot: profile,
      assessment: matchedPlan.assessment,
      weeklyPlan: matchedPlan.weeklyPlan,
      dietaryTips: matchedPlan.dietaryTips,
      warnings: matchedPlan.warnings,
      rawResponse: generated.rawResponse
        ? { id: generated.rawResponse.id, usage: generated.rawResponse.usage }
        : matchedPlan,
    });

    return res.status(201).json({
      success: true,
      plan,
    });
  } catch (error) {
    return res.status(error.status || 503).json({
      success: false,
      message: error.message || "AI plan generation failed. Please try again.",
    });
  }
});

aiRoutes.get("/plans/current", requireAuth, async (req, res) => {
  try {
    const plan = await AIPlan.findOne({ userId: req.user._id, isCurrent: true }).sort({ version: -1 });
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch current AI plan" });
  }
});

aiRoutes.get("/plans/history", requireAuth, async (req, res) => {
  if (!req.user.isPremium) {
    return res.status(402).json({ success: false, message: "Upgrade to premium to view plan history." });
  }

  try {
    const plans = await AIPlan.find({ userId: req.user._id }).sort({ version: -1 });
    return res.status(200).json({ success: true, plans });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch AI plan history" });
  }
});

aiRoutes.post("/fitbot/stream", requireAuth, async (req, res) => {
  if (!req.user.isPremium) {
    return res.status(402).json({ success: false, message: "FitBot is a premium workout coaching feature." });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const { message, sessionId, workoutContext = {} } = req.body;
    if (!message?.trim()) {
      res.write(`data: ${JSON.stringify({ type: "error", message: "Message is required." })}\n\n`);
      return res.end();
    }

    const profile = await loadCompletedProfile(req.user._id);
    const plan = await AIPlan.findOne({ userId: req.user._id, isCurrent: true }).sort({ version: -1 }).lean();

    let session = sessionId
      ? await FitBotSession.findOne({ _id: sessionId, userId: req.user._id })
      : null;

    if (!session) {
      session = await FitBotSession.create({
        userId: req.user._id,
        planId: plan?._id,
        workoutContext,
        messages: [],
      });
    }

    session.messages.push({ role: "user", content: message });
    let assistantMessage = "";

    const messages = [...session.messages.map((item) => ({ role: item.role, content: item.content }))];
    await streamFitBotResponse({
      profile,
      plan,
      workoutContext,
      messages,
      onText: (text) => {
        assistantMessage += text;
        res.write(`data: ${JSON.stringify({ type: "delta", text, sessionId: session._id })}\n\n`);
      },
    });

    session.messages.push({ role: "assistant", content: assistantMessage });
    session.workoutContext = workoutContext;
    await session.save();

    res.write(`data: ${JSON.stringify({ type: "done", sessionId: session._id })}\n\n`);
    return res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ type: "error", message: error.message || "FitBot failed to respond." })}\n\n`);
    return res.end();
  }
});

export default aiRoutes;

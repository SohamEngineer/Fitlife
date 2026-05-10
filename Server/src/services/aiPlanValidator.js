import { z } from "zod";

export const profileInputSchema = z.object({
  physical: z.object({
    age: z.coerce.number().min(13).max(90),
    gender: z.string().min(1),
    height: z.coerce.number().min(120).max(230),
    weight: z.coerce.number().min(35).max(220),
    bodyFat: z.coerce.number().min(1).max(70).optional().nullable(),
  }),
  biological: z.object({
    activityLevel: z.string().min(1),
    sleepHours: z.coerce.number().min(1).max(14),
    restingHeartRate: z.coerce.number().min(35).max(220).optional().nullable(),
  }),
  medical: z.object({
    injuries: z.array(z.string()).default([]),
    chronicConditions: z.array(z.string()).default([]),
    medications: z.array(z.string()).default([]),
    notes: z.string().optional().default(""),
  }),
  trainingHistory: z.object({
    yearsTraining: z.coerce.number().min(0).max(80),
    currentWorkoutType: z.string().min(1),
    weeklyFrequency: z.coerce.number().min(1).max(7),
    recentTrainingNotes: z.string().optional().default(""),
  }),
  goals: z.object({
    primary: z.string().min(1),
    secondary: z.array(z.string()).default([]),
    targetTimeline: z.string().optional().default(""),
    motivation: z.string().optional().default(""),
  }),
  preferences: z.object({
    location: z.enum(["home", "gym", "both"]).default("both"),
    equipment: z.array(z.string()).default([]),
    duration: z.coerce.number().min(10).max(180),
    intensity: z.string().min(1),
    workoutDays: z.array(z.string()).default([]),
  }),
});

export const aiPlanSchema = z.object({
  assessment: z.object({
    summary: z.string().min(10),
    readinessScore: z.coerce.number().min(0).max(100),
    trainingLoad: z.string().min(1),
    planStyle: z.string().min(1),
  }),
  weeklyPlan: z.array(
    z.object({
      day: z.string().min(1),
      focus: z.string().min(1),
      duration: z.coerce.number().min(10).max(180),
      intensity: z.string().min(1),
      exercises: z.array(
        z.object({
          title: z.string().min(1),
          sets: z.coerce.number().min(1).max(8),
          reps: z.string().min(1),
          restSec: z.coerce.number().min(0).max(600),
          notes: z.string().optional().default(""),
          source: z.enum(["fitlife_library", "ai_fallback"]).default("ai_fallback"),
          workoutId: z.string().optional().nullable(),
          workoutLocation: z.string().optional().nullable(),
        })
      ).min(1),
    })
  ).min(1),
  dietaryTips: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([]),
});

export const validateProfileInput = (payload) => {
  const parsed = profileInputSchema.parse(payload);
  const bmi = parsed.physical.weight / ((parsed.physical.height / 100) ** 2);

  return {
    ...parsed,
    biological: {
      ...parsed.biological,
      bmi: Number(bmi.toFixed(1)),
    },
    completedAt: new Date(),
  };
};

export const validateAIPlan = (payload) => aiPlanSchema.parse(payload);

import AddHomeWorkout from "../models/HomeWorkout.js";
import AddGymWorkout from "../models/GymWorkout.js";

const normalize = (value = "") => String(value).toLowerCase();

const mapWorkout = (workout, location) => ({
  id: String(workout._id),
  title: workout.title,
  type: workout.type,
  description: workout.description,
  day: workout.day,
  caloryburn: workout.caloryburn,
  location,
  videoAvailable: Boolean(workout.video),
});

export const getWorkoutCatalog = async (location = "both") => {
  const shouldLoadHome = location === "home" || location === "both";
  const shouldLoadGym = location === "gym" || location === "both";
  const [homeWorkouts, gymWorkouts] = await Promise.all([
    shouldLoadHome ? AddHomeWorkout.find().select("-video").lean() : [],
    shouldLoadGym ? AddGymWorkout.find().select("-video").lean() : [],
  ]);

  return [
    ...homeWorkouts.map((workout) => mapWorkout(workout, "home")),
    ...gymWorkouts.map((workout) => mapWorkout(workout, "gym")),
  ];
};

const scoreWorkout = (exercise, workout, profile) => {
  const title = normalize(workout.title);
  const type = normalize(workout.type);
  const goal = normalize(profile.goals?.primary);
  const exerciseTitle = normalize(exercise.title);
  let score = 0;

  if (title.includes(exerciseTitle) || exerciseTitle.includes(title)) score += 8;
  if (exerciseTitle.includes(type) || type.includes(exerciseTitle)) score += 4;
  if (goal.includes("muscle") && /upper|lower|full|strength/i.test(workout.type)) score += 3;
  if (goal.includes("fat") && /cardio|full/i.test(workout.type)) score += 3;
  if (goal.includes("endurance") && /cardio|full/i.test(workout.type)) score += 3;
  if (profile.preferences?.location === workout.location) score += 2;

  return score;
};

export const attachWorkoutMatches = (plan, catalog, profile) => ({
  ...plan,
  weeklyPlan: plan.weeklyPlan.map((day) => ({
    ...day,
    exercises: day.exercises.map((exercise) => {
      if (exercise.workoutId) {
        const exact = catalog.find((workout) => workout.id === exercise.workoutId);
        if (exact) {
          return {
            ...exercise,
            source: "fitlife_library",
            workoutId: exact.id,
            workoutLocation: exact.location,
            videoAvailable: exact.videoAvailable,
          };
        }
      }

      const match = catalog
        .map((workout) => ({ workout, score: scoreWorkout(exercise, workout, profile) }))
        .sort((a, b) => b.score - a.score)[0];

      if (!match || match.score < 3) {
        return {
          ...exercise,
          source: "ai_fallback",
          workoutId: null,
          workoutLocation: null,
          videoAvailable: false,
        };
      }

      return {
        ...exercise,
        title: exercise.title || match.workout.title,
        source: "fitlife_library",
        workoutId: match.workout.id,
        workoutLocation: match.workout.location,
        videoAvailable: match.workout.videoAvailable,
      };
    }),
  })),
});

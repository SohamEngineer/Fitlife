export const NUTRITION_GOALS = [
  {
    value: "maintain",
    label: "Maintain weight",
    calorieDelta: 0,
    ratios: { carbs: 45, protein: 25, fat: 30 },
  },
  {
    value: "mild_loss",
    label: "Mild weight loss",
    calorieDelta: -250,
    ratios: { carbs: 35, protein: 35, fat: 30 },
  },
  {
    value: "weight_loss",
    label: "Weight loss",
    calorieDelta: -500,
    ratios: { carbs: 30, protein: 40, fat: 30 },
  },
  {
    value: "mild_gain",
    label: "Mild weight gain",
    calorieDelta: 250,
    ratios: { carbs: 45, protein: 25, fat: 30 },
  },
  {
    value: "muscle_gain",
    label: "Muscle gain",
    calorieDelta: 350,
    ratios: { carbs: 40, protein: 30, fat: 30 },
  },
];

export const CALORIE_BURN_ACTIVITIES = [
  { value: "walking_slow", label: "Walking: slow", met: 2.8 },
  { value: "walking_moderate", label: "Walking: moderate", met: 3.5 },
  { value: "walking_fast", label: "Walking: fast", met: 4.3 },
  { value: "running_slow", label: "Running: slow", met: 8.3 },
  { value: "running_moderate", label: "Running: moderate", met: 9.8 },
  { value: "running_fast", label: "Running: fast", met: 11.5 },
  { value: "cycling_moderate", label: "Cycling: moderate", met: 8 },
  { value: "cycling_fast", label: "Cycling: fast", met: 10 },
  { value: "swimming_moderate", label: "Swimming: moderate", met: 5.8 },
  { value: "swimming_vigorous", label: "Swimming: vigorous", met: 9.8 },
  { value: "elliptical", label: "Elliptical trainer", met: 5 },
  { value: "weight_general", label: "Weight lifting: general", met: 3.5 },
  { value: "weight_vigorous", label: "Weight lifting: vigorous", met: 6 },
  { value: "circuit", label: "Circuit training", met: 8 },
  { value: "yoga", label: "Hatha yoga / stretching", met: 2.5 },
  { value: "football", label: "Football / soccer", met: 7 },
  { value: "basketball", label: "Basketball", met: 6.5 },
  { value: "tennis", label: "Tennis", met: 7.3 },
];

const round = (value, digits = 0) => Number(value.toFixed(digits));

const toNumber = (value) => Number(value);

export function calculateBmr({ age, gender, height, weight }) {
  const w = toNumber(weight);
  const h = toNumber(height);
  const a = toNumber(age);

  return gender === "male"
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;
}

export function getGoalConfig(goalValue) {
  return NUTRITION_GOALS.find((goal) => goal.value === goalValue) || NUTRITION_GOALS[0];
}

export function calculateDailyCalories(form) {
  const bmr = calculateBmr(form);
  const maintenanceCalories = bmr * toNumber(form.activity);
  const goal = getGoalConfig(form.goal);
  const targetCalories = Math.max(1200, maintenanceCalories + goal.calorieDelta);

  return {
    bmr: round(bmr),
    maintenanceCalories: round(maintenanceCalories),
    targetCalories: round(targetCalories),
    goalLabel: goal.label,
  };
}

export function calculateCalories(form) {
  return calculateDailyCalories({ ...form, goal: "maintain" }).maintenanceCalories.toFixed(2);
}

export function calculateMacroTargets(form) {
  const dailyCalories = calculateDailyCalories(form);
  const goal = getGoalConfig(form.goal);
  const macros = Object.entries(goal.ratios).reduce((acc, [name, percent]) => {
    const calories = dailyCalories.targetCalories * (percent / 100);
    const divisor = name === "fat" ? 9 : 4;

    acc[name] = {
      percent,
      calories: round(calories),
      grams: round(calories / divisor),
    };

    return acc;
  }, {});

  return {
    ...dailyCalories,
    macros,
  };
}

export function calculateProteinTarget(form) {
  const weight = toNumber(form.weight);
  const activity = toNumber(form.activity);
  const goal = getGoalConfig(form.goal);
  const baseFactor = activity <= 1.2 ? 0.8 : activity <= 1.375 ? 1 : activity <= 1.55 ? 1.3 : activity <= 1.725 ? 1.55 : 1.75;
  const goalBoost = goal.value.includes("loss") ? 0.2 : goal.value === "muscle_gain" ? 0.25 : 0;
  const targetFactor = Math.min(2, baseFactor + goalBoost);
  const dailyCalories = calculateDailyCalories(form);
  const targetGrams = weight * targetFactor;

  return {
    rda: round(weight * 0.8),
    rangeLow: round(weight * 0.8),
    rangeHigh: round(weight * 1.8),
    targetGrams: round(targetGrams),
    targetFactor: round(targetFactor, 2),
    proteinCalories: round(targetGrams * 4),
    calorieShare: round(((targetGrams * 4) / dailyCalories.targetCalories) * 100),
  };
}

export function calculateCaloriesBurned({ activity, hours, minutes, weight }) {
  const selectedActivity = CALORIE_BURN_ACTIVITIES.find((item) => item.value === activity) || CALORIE_BURN_ACTIVITIES[0];
  const durationMinutes = toNumber(hours || 0) * 60 + toNumber(minutes || 0);
  const calories = (durationMinutes * selectedActivity.met * 3.5 * toNumber(weight)) / 200;

  return {
    activity: selectedActivity.label,
    met: selectedActivity.met,
    durationMinutes,
    calories: round(calories),
    caloriesPerHour: round((60 * selectedActivity.met * 3.5 * toNumber(weight)) / 200),
  };
}

import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import "./style/mealplaining.css";
import MealPlanningSamples from "../../data/maeaplainingdata";

const userProfiles = {
  fat_loss: {
    label: "Fat loss user",
    ratios: { protein: 35, carbs: 35, fat: 30 },
    focus: "Higher protein, fiber-rich carbs, and controlled fats.",
  },
  balanced: {
    label: "Balanced lifestyle user",
    ratios: { protein: 25, carbs: 45, fat: 30 },
    focus: "Stable meals for energy, recovery, and daily consistency.",
  },
  muscle_gain: {
    label: "Muscle gain user",
    ratios: { protein: 30, carbs: 45, fat: 25 },
    focus: "More carbs around training with steady protein across meals.",
  },
  vegetarian: {
    label: "Vegetarian user",
    ratios: { protein: 28, carbs: 47, fat: 25 },
    focus: "Plant-forward meals with dairy, legumes, soy, and whole grains.",
  },
};

const mealLibraries = {
  omnivore: {
    breakfast: ["Greek yogurt bowl", "Egg white veggie omelet", "Oats with whey and banana"],
    lunch: ["Grilled chicken rice bowl", "Turkey wrap with salad", "Tuna quinoa plate"],
    dinner: ["Salmon with sweet potato", "Lean beef stir fry", "Chicken dal with rice"],
    snack: ["Apple with peanut butter", "Protein shake", "Cottage cheese and berries"],
  },
  vegetarian: {
    breakfast: ["Paneer veggie toast", "Oats with milk and chia", "Greek yogurt fruit bowl"],
    lunch: ["Rajma brown rice bowl", "Paneer quinoa salad", "Chickpea wrap with curd"],
    dinner: ["Tofu stir fry with rice", "Dal, roti, and salad", "Paneer tikka bowl"],
    snack: ["Roasted chana", "Sprouts chaat", "Milk smoothie"],
  },
};

const mealSplitByCount = {
  3: [
    ["Breakfast", 0.3],
    ["Lunch", 0.38],
    ["Dinner", 0.32],
  ],
  4: [
    ["Breakfast", 0.25],
    ["Lunch", 0.35],
    ["Snack", 0.1],
    ["Dinner", 0.3],
  ],
  5: [
    ["Breakfast", 0.22],
    ["Morning snack", 0.1],
    ["Lunch", 0.32],
    ["Evening snack", 0.11],
    ["Dinner", 0.25],
  ],
};

const formatMealItems = (items) => (Array.isArray(items) ? items.join(", ") : items);

const getMealKey = (mealName) => {
  const lower = mealName.toLowerCase();
  if (lower.includes("breakfast")) return "breakfast";
  if (lower.includes("lunch")) return "lunch";
  if (lower.includes("dinner")) return "dinner";
  return "snack";
};

const buildCustomPlan = ({ calories, profile, diet, meals }) => {
  const selectedProfile = userProfiles[profile];
  const selectedDiet = profile === "vegetarian" ? "vegetarian" : diet;
  const library = mealLibraries[selectedDiet];
  const split = mealSplitByCount[meals];
  const targetCalories = Number(calories);

  const plan = split.map(([mealName, percent], index) => {
    const key = getMealKey(mealName);
    const choices = library[key];
    const title = choices[index % choices.length];
    const mealCalories = Math.round(targetCalories * percent);

    return {
      meal: mealName,
      title,
      calories: mealCalories,
      note:
        key === "snack"
          ? "Keep it light and protein-aware."
          : "Add vegetables or salad for volume and micronutrients.",
    };
  });

  const macros = {
    protein: Math.round((targetCalories * (selectedProfile.ratios.protein / 100)) / 4),
    carbs: Math.round((targetCalories * (selectedProfile.ratios.carbs / 100)) / 4),
    fat: Math.round((targetCalories * (selectedProfile.ratios.fat / 100)) / 9),
  };

  return {
    calories: targetCalories,
    profile: selectedProfile,
    diet: selectedDiet,
    macros,
    plan,
  };
};

const MealPlanning = () => {
  const location = useLocation();
  const [activePlanIndex, setActivePlanIndex] = useState(1);
  const [customForm, setCustomForm] = useState({
    calories: "1800",
    profile: "fat_loss",
    diet: "omnivore",
    meals: "4",
  });

  useEffect(() => {
    if (location.pathname === "/meal") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const activePlan = MealPlanningSamples[activePlanIndex];
  const customPlan = useMemo(() => buildCustomPlan(customForm), [customForm]);

  const updateCustomForm = (event) => {
    const { name, value } = event.target;
    setCustomForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="Mealcontainer">
      <section className="meal-planner-shell">
        <div className="meal-planner-heading">
          <p>Meal planning</p>
          <h2>Compact plans for different users</h2>
          <span>Pick a static sample or generate a quick custom day plan from goal, calories, diet, and meal count.</span>
        </div>

        <div className="meal-planner-grid">
          <article className="meal-panel sample-plan-panel">
            <div className="meal-panel-header">
              <div>
                <p>Static samples</p>
                <h3>{activePlan.planHeading}</h3>
              </div>
              <div className="meal-plan-tabs" aria-label="Sample meal plan calories">
                {MealPlanningSamples.map((plan, index) => (
                  <button
                    key={plan.planHeading}
                    type="button"
                    className={activePlanIndex === index ? "active" : ""}
                    onClick={() => setActivePlanIndex(index)}
                  >
                    {plan.planHeading.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="compact-meal-table">
              {activePlan.plan.map((entry, index) => (
                <div key={`${entry.meal}-${index}`} className={entry.meal === "Total" ? "meal-total-row" : "meal-item-row"}>
                  <strong>{entry.meal}</strong>
                  <span>{formatMealItems(entry.plan)}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="meal-panel custom-meal-panel">
            <div className="meal-panel-header">
              <div>
                <p>Custom plan</p>
                <h3>{customPlan.profile.label}</h3>
              </div>
            </div>

            <div className="custom-meal-controls">
              <label>
                Calories
                <select name="calories" value={customForm.calories} onChange={updateCustomForm}>
                  <option value="1200">1200 kcal</option>
                  <option value="1500">1500 kcal</option>
                  <option value="1800">1800 kcal</option>
                  <option value="2000">2000 kcal</option>
                  <option value="2400">2400 kcal</option>
                </select>
              </label>
              <label>
                User type
                <select name="profile" value={customForm.profile} onChange={updateCustomForm}>
                  {Object.entries(userProfiles).map(([value, profile]) => (
                    <option key={value} value={value}>
                      {profile.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Diet
                <select name="diet" value={customForm.diet} onChange={updateCustomForm}>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                </select>
              </label>
              <label>
                Meals
                <select name="meals" value={customForm.meals} onChange={updateCustomForm}>
                  <option value="3">3 meals</option>
                  <option value="4">4 meals</option>
                  <option value="5">5 meals</option>
                </select>
              </label>
            </div>

            <div className="macro-strip">
              <span>{customPlan.macros.protein}g protein</span>
              <span>{customPlan.macros.carbs}g carbs</span>
              <span>{customPlan.macros.fat}g fat</span>
            </div>

            <p className="custom-plan-focus">{customPlan.profile.focus}</p>

            <div className="custom-meal-list">
              {customPlan.plan.map((meal) => (
                <div key={meal.meal} className="custom-meal-card">
                  <div>
                    <strong>{meal.meal}</strong>
                    <span>{meal.calories} kcal</span>
                  </div>
                  <h4>{meal.title}</h4>
                  <p>{meal.note}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default MealPlanning;

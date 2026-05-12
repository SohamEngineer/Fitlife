import React, { useMemo, useState } from "react";
import "./style/caloricalculator.css";
import { ACTIVITY_LEVELS } from "../../constants/activityLevels";
import {
  CALORIE_BURN_ACTIVITIES,
  NUTRITION_GOALS,
  calculateCaloriesBurned,
  calculateDailyCalories,
  calculateMacroTargets,
  calculateProteinTarget,
} from "../../utils/calculatecalories";

const tools = [
  { id: "daily", label: "Daily calories" },
  { id: "macro", label: "Macro calculator" },
  { id: "protein", label: "Protein calculator" },
  { id: "burn", label: "Calorie burn" },
];

const initialNutritionForm = {
  age: "",
  gender: "male",
  height: "",
  weight: "",
  activity: "1.2",
  goal: "maintain",
};

const initialBurnForm = {
  activity: "walking_moderate",
  hours: "",
  minutes: "30",
  weight: "",
};

const StatCard = ({ label, value, detail }) => (
  <div className="nutrition-stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
    {detail && <small>{detail}</small>}
  </div>
);

const validateNutritionForm = (form) => {
  const required = ["age", "gender", "height", "weight", "activity", "goal"];
  if (required.some((field) => !form[field])) return "Fill age, gender, height, weight, activity, and goal.";
  if (Number(form.age) < 18 || Number(form.age) > 80) return "Age must be between 18 and 80.";
  if (Number(form.height) < 120 || Number(form.height) > 230) return "Height must be between 120 and 230 cm.";
  if (Number(form.weight) < 35 || Number(form.weight) > 220) return "Weight must be between 35 and 220 kg.";
  return "";
};

function CalorieCalculator() {
  const [activeTool, setActiveTool] = useState("daily");
  const [form, setForm] = useState(initialNutritionForm);
  const [burnForm, setBurnForm] = useState(initialBurnForm);
  const [result, setResult] = useState(null);
  const [burnResult, setBurnResult] = useState(null);
  const [error, setError] = useState("");

  const activeToolLabel = useMemo(() => tools.find((tool) => tool.id === activeTool)?.label, [activeTool]);
  const selectedBurnActivity = CALORIE_BURN_ACTIVITIES.find((activity) => activity.value === burnForm.activity);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBurnChange = (event) => {
    const { name, value } = event.target;
    setBurnForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleToolChange = (toolId) => {
    setActiveTool(toolId);
    setResult(null);
    setBurnResult(null);
    setError("");
  };

  const calculateNutrition = (event) => {
    event.preventDefault();
    const validationMessage = validateNutritionForm(form);

    if (validationMessage) {
      setResult(null);
      setError(validationMessage);
      return;
    }

    setError("");

    if (activeTool === "macro") {
      setResult({ type: "macro", data: calculateMacroTargets(form) });
      return;
    }

    if (activeTool === "protein") {
      setResult({ type: "protein", data: calculateProteinTarget(form) });
      return;
    }

    setResult({ type: "daily", data: calculateDailyCalories(form) });
  };

  const calculateBurn = (event) => {
    event.preventDefault();
    const duration = Number(burnForm.hours || 0) * 60 + Number(burnForm.minutes || 0);

    if (!burnForm.weight || Number(burnForm.weight) < 35 || Number(burnForm.weight) > 220) {
      setBurnResult(null);
      setError("Enter body weight between 35 and 220 kg.");
      return;
    }

    if (duration <= 0) {
      setBurnResult(null);
      setError("Enter a workout duration.");
      return;
    }

    setError("");
    setBurnResult(calculateCaloriesBurned(burnForm));
  };

  const handleReset = () => {
    setForm(initialNutritionForm);
    setBurnForm(initialBurnForm);
    setResult(null);
    setBurnResult(null);
    setError("");
  };

  const renderNutritionForm = () => (
    <form className="calculator-container nutrition-tool-card" onSubmit={calculateNutrition}>
      <div className="field-group">
        <div className="Caloriinput-group">
          <label htmlFor="age">Age</label>
          <input type="number" name="age" min="18" max="80" value={form.age} onChange={handleChange} placeholder="18 - 80" />
        </div>

        <div className="Caloriinput-group">
          <label>Gender</label>
          <div className="radio-group">
            <input type="radio" id="male" name="gender" value="male" checked={form.gender === "male"} onChange={handleChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="female" checked={form.gender === "female"} onChange={handleChange} />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>

      <div className="field-group">
        <div className="Caloriinput-group">
          <label htmlFor="height">Height (cm)</label>
          <input type="number" name="height" min="120" max="230" value={form.height} onChange={handleChange} placeholder="176" />
        </div>

        <div className="Caloriinput-group">
          <label htmlFor="weight">Weight (kg)</label>
          <input type="number" name="weight" min="35" max="220" value={form.weight} onChange={handleChange} placeholder="98" />
        </div>
      </div>

      <div className="field-group">
        <div className="Caloriinput-group">
          <label htmlFor="activity">Activity Level</label>
          <select name="activity" value={form.activity} onChange={handleChange}>
            {ACTIVITY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        <div className="Caloriinput-group">
          <label htmlFor="goal">Goal</label>
          <select name="goal" value={form.goal} onChange={handleChange}>
            {NUTRITION_GOALS.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calculator-buttons">
        <button type="button" onClick={handleReset}>Clear</button>
        <button type="submit">Calculate {activeTool === "daily" ? "calories" : activeTool}</button>
      </div>
    </form>
  );

  const renderBurnForm = () => (
    <form className="calculator-container nutrition-tool-card" onSubmit={calculateBurn}>
      <div className="Caloriinput-group">
        <label htmlFor="activity">Activity</label>
        <select name="activity" value={burnForm.activity} onChange={handleBurnChange}>
          {CALORIE_BURN_ACTIVITIES.map((activity) => (
            <option key={activity.value} value={activity.value}>
              {activity.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group burn-duration-grid">
        <div className="Caloriinput-group">
          <label htmlFor="hours">Hours</label>
          <input type="number" name="hours" min="0" max="12" value={burnForm.hours} onChange={handleBurnChange} placeholder="0" />
        </div>
        <div className="Caloriinput-group">
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" min="0" max="59" value={burnForm.minutes} onChange={handleBurnChange} placeholder="30" />
        </div>
        <div className="Caloriinput-group">
          <label htmlFor="weight">Body weight (kg)</label>
          <input type="number" name="weight" min="35" max="220" value={burnForm.weight} onChange={handleBurnChange} placeholder="98" />
        </div>
      </div>

      <p className="nutrition-helper">Selected MET: {selectedBurnActivity?.met}. Estimates use duration, body weight, and activity intensity.</p>

      <div className="calculator-buttons">
        <button type="button" onClick={handleReset}>Clear</button>
        <button type="submit">Calculate burn</button>
      </div>
    </form>
  );

  const renderResult = () => {
    if (activeTool === "burn") {
      if (!burnResult) {
        return <StatCard label="Calories burned" value="--" detail="Enter activity, duration, and body weight." />;
      }

      return (
        <>
          <StatCard label="Calories burned" value={`${burnResult.calories} kcal`} detail={burnResult.activity} />
          <StatCard label="Duration" value={`${burnResult.durationMinutes} min`} detail={`MET ${burnResult.met}`} />
          <StatCard label="Per hour pace" value={`${burnResult.caloriesPerHour} kcal`} detail="Estimated burn rate" />
        </>
      );
    }

    if (!result) {
      return <StatCard label={activeToolLabel} value="--" detail="Complete the form and calculate." />;
    }

    if (result.type === "macro") {
      return (
        <>
          <StatCard label="Target calories" value={`${result.data.targetCalories} kcal`} detail={result.data.goalLabel} />
          <StatCard label="Carbs" value={`${result.data.macros.carbs.grams} g`} detail={`${result.data.macros.carbs.percent}% / ${result.data.macros.carbs.calories} kcal`} />
          <StatCard label="Protein" value={`${result.data.macros.protein.grams} g`} detail={`${result.data.macros.protein.percent}% / ${result.data.macros.protein.calories} kcal`} />
          <StatCard label="Fat" value={`${result.data.macros.fat.grams} g`} detail={`${result.data.macros.fat.percent}% / ${result.data.macros.fat.calories} kcal`} />
        </>
      );
    }

    if (result.type === "protein") {
      return (
        <>
          <StatCard label="Protein target" value={`${result.data.targetGrams} g`} detail={`${result.data.targetFactor} g/kg body weight`} />
          <StatCard label="Healthy range" value={`${result.data.rangeLow}-${result.data.rangeHigh} g`} detail="0.8-1.8 g/kg reference range" />
          <StatCard label="Protein calories" value={`${result.data.proteinCalories} kcal`} detail={`${result.data.calorieShare}% of target calories`} />
          <StatCard label="Baseline RDA" value={`${result.data.rda} g`} detail="Minimum adult maintenance estimate" />
        </>
      );
    }

    return (
      <>
        <StatCard label="Target calories" value={`${result.data.targetCalories} kcal`} detail={result.data.goalLabel} />
        <StatCard label="Maintenance" value={`${result.data.maintenanceCalories} kcal`} detail="Activity-adjusted estimate" />
        <StatCard label="BMR" value={`${result.data.bmr} kcal`} detail="Mifflin-St Jeor estimate" />
      </>
    );
  };

  return (
    <section className="calorie-calculator">
      <div className="nutrition-heading">
        <p>Calorie calculator</p>
        <h2>Nutrition tools</h2>
        <span>Daily calories, macro splits, protein targets, and workout burn in one place.</span>
      </div>

      <div className="nutrition-tool-tabs" role="tablist" aria-label="Nutrition calculators">
        {tools.map((tool) => (
          <button
            key={tool.id}
            type="button"
            className={activeTool === tool.id ? "active" : ""}
            onClick={() => handleToolChange(tool.id)}
          >
            {tool.label}
          </button>
        ))}
      </div>

      <div className="nutrition-tool-layout">
        {activeTool === "burn" ? renderBurnForm() : renderNutritionForm()}

        <aside className="nutrition-results">
          <div className="nutrition-results-header">
            <p>Result</p>
            <h3>{activeToolLabel}</h3>
          </div>
          {error && <p className="nutrition-error">{error}</p>}
          <div className="nutrition-result-grid">{renderResult()}</div>
        </aside>
      </div>

      <p className="nutrition-reference-note">
        Inspired by Calculator.net fitness calculators. These are estimates for planning and are not medical nutrition advice.
      </p>
    </section>
  );
}

export default CalorieCalculator;

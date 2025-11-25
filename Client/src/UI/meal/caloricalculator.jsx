import React, { useState } from "react";
import "./style/caloricalculator.css";
import { ACTIVITY_LEVELS } from "../../constants/activityLevels";
import { calculateCalories } from "../../utils/calculatecalories";

function CalorieCalculator() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activity: "1.2",
  });

  const [calories, setCalories] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Minimal validation
    for (let key in form) {
      if (!form[key]) return alert("All fields are required.");
    }

    setCalories(calculateCalories(form));
  };

  const handleReset = () => {
    setForm({ age: "", gender: "", height: "", weight: "", activity: "1.2" });
    setCalories(null);
  };

  return (
    <section className="calorie-calculator">
      <h2>Calorie Calculator</h2>

      <form className="calculator-container" onSubmit={handleSubmit}>
        {/* Group 1 */}
        <div className="field-group">
          <div className="Caloriinput-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              min="15"
              max="80"
              value={form.age}
              onChange={handleChange}
              placeholder="15 - 80"
            />
          </div>

          <div className="Caloriinput-group">
            <label>Gender</label>
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={form.gender === "male"}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={form.gender === "female"}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div className="field-group">
          <div className="Caloriinput-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              name="height"
              min="130"
              max="230"
              value={form.height}
              onChange={handleChange}
            />
          </div>

          <div className="Caloriinput-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              min="40"
              max="160"
              value={form.weight}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Activity */}
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

        {/* Buttons */}
        <div className="calculator-buttons">
          <button type="button" onClick={handleReset}>Clear</button>
          <button type="submit">Calculate</button>
        </div>
      </form>

      {calories && (
        <p className="result">
          Estimated Daily Calories: <span>{calories} kcal</span>
        </p>
      )}
    </section>
  );
}

export default CalorieCalculator;

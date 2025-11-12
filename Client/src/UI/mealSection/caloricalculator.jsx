import React, { useState } from 'react';
import './caloricalculator.css';

function Caloricalculator() {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activity: '1.2',
  });

  const [calories, setCalories] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCalculateSubmit = (e) => {
    e.preventDefault();

    const { age, gender, height, weight, activity } = form;

    if (!age || !gender || !height || !weight || !activity) {
      alert('Please fill all fields');
      return;
    }

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    let bmr = 0;

    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const calorieNeeds = bmr * parseFloat(activity);
    setCalories(calorieNeeds.toFixed(2));
  };

  const handleReset = () => {
    setForm({ age: '', gender: '', height: '', weight: '', activity: '1.2' });
    setCalories(null);
  };

  return (
    
    <section className="calorie-calculator">
      <h2>Calorie Calculator</h2>
      <p className="about-calculator">
        This Calorie Calculator can be used to estimate the number of calories a person needs to consume each day.
      </p>

      <form className="calculator-container" onSubmit={handleCalculateSubmit}>
        <div className="field-group">
          <div className="Caloriinput-group">
            <label htmlFor="age">Age</label>
            <input type="number" max="80" min="15" name="age" required placeholder="15 - 80" value={form.age} onChange={handleChange} />
          </div>

          <div className="Caloriinput-group">
            <label>Gender</label>
            <div className="radio-group">
              <input type="radio" id="male" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} />
              <label htmlFor="male">Male</label>
              <input type="radio" id="female" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="Caloriinput-group">
            <label htmlFor="height">Height</label>
            <input type="number" max="230" min="130" name="height" required placeholder="130 - 230" value={form.height} onChange={handleChange} />
            <span>cm</span>
          </div>
          <div className="Caloriinput-group">
            <label htmlFor="weight">Weight</label>
            <input type="number" max="160" min="40" name="weight" required placeholder="40 - 160" value={form.weight} onChange={handleChange} />
            <span>kg</span>
          </div>
        </div>

        <div className="Caloriinput-group">
          <label htmlFor="activity">Activity Level</label>
          <select name="activity" value={form.activity} onChange={handleChange}>
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Lightly active (light exercise)</option>
            <option value="1.55">Moderately active (moderate exercise)</option>
            <option value="1.725">Very active (hard exercise)</option>
            <option value="1.9">Extra active (very hard exercise)</option>
          </select>
        </div>

        <div className="calculator-buttons">
          <button type="reset" onClick={handleReset}>Clear values</button>
          <button type="submit">
            <i className="fa-solid fa-circle-chevron-right" />
            <span>Calculate</span>
          </button>
        </div>
      </form>

      {calories && (
        <p style={{ marginTop: "1rem", fontSize: "18px", fontWeight: "600" }}>
          Estimated Daily Calories: <span style={{ color: "#ff6600" }}>{calories} kcal</span>
        </p>
      )}
    </section>

  );
}

export default Caloricalculator;

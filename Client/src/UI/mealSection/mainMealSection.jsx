import React, { useState } from 'react';
// import MealPlanning from '';
import "./mainmeal.css";
import Caloricalculator from './caloricalculator';
import MealPlanning from './mealPlaining';

function MainMealSection() {
  const [activeFeature, setActiveFeature] = useState("mealPlanning");

  const toggleFeature = (feature) => {
    setActiveFeature(prev => (prev === feature ? null : feature));
  };

  return (
    <div className="main-meal-container">
      <h2>Eat Good. Feel Good.</h2>

      <div className="button-groups">
        <button  className="active" onClick={() => toggleFeature('mealPlanning')}>
          {activeFeature === 'mealPlanning' ? "Hide Meal Planning" : "Show Meal Planning"}
        </button>
        <button onClick={() => toggleFeature('calorieCalculator')}>
          {activeFeature === 'calorieCalculator' ? "Hide Calorie Calculator" : "Show Calorie Calculator"}
        </button>
        <button onClick={() => toggleFeature('feature3')}>
          {activeFeature === 'feature3' ? "Hide Feature 3" : "Show Feature 3"}
        </button>
      </div>

      {/* Conditionally render components based on active feature */}
      {activeFeature === 'mealPlanning' && (
        <div className="meal-feature">
          <MealPlanning />
        </div>
      )}
      {activeFeature === 'calorieCalculator' && (
        <div className="meal-feature">
          <Caloricalculator />
        </div>
      )}
      {activeFeature === 'feature3' && (
        <div className="meal-feature">
          {/* Render Feature 3 component here */}
          <h3>Feature 3 Content</h3>
        </div>
      )}
    </div>
  );
}

export default MainMealSection;
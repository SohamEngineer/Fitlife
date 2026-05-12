import React, { useState } from 'react';
import "./style/mainmeal.css";
import BodyFatCalculator from './bodyfatcalculator';
import CalorieCalculator from './caloricalculator';
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
        <button
          className={activeFeature === 'mealPlanning' ? "active" : ""}
          onClick={() => toggleFeature('mealPlanning')}
        >
          {activeFeature === 'mealPlanning' ? "Hide Meal Planning" : "Show Meal Planning"}
        </button>
        <button
          className={activeFeature === 'calorieCalculator' ? "active" : ""}
          onClick={() => toggleFeature('calorieCalculator')}
        >
          {activeFeature === 'calorieCalculator' ? "Hide Calorie Calculator" : "Show Calorie Calculator"}
        </button>
        <button
          className={activeFeature === 'more' ? "active" : ""}
          onClick={() => toggleFeature('more')}
        >
          {activeFeature === 'more' ? "Hide More" : "More"}
        </button>
      </div>

      {activeFeature === 'mealPlanning' && (
        <div className="meal-feature">
          <MealPlanning/>
        </div>
      )}
      {activeFeature === 'calorieCalculator' && (
        <div className="meal-feature">
          <CalorieCalculator />
        </div>
      )}
      {activeFeature === 'more' && (
        <div className="meal-feature">
          <BodyFatCalculator />
        </div>
      )}
    </div>
  );
}

export default MainMealSection;

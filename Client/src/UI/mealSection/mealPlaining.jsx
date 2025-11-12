import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "./mealplaining.css"
import MealPlanningSamples from '../../data/maeaplainingdata';

const MealPlanning = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/meal") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <main className="Mealcontainer">
    <section className="meal-planning-samples">
      {MealPlanningSamples.map((plan, i) => (
        <article key={i}>
          <h2>{plan.planHeading}</h2>
          <table>
            <thead>
              <tr className="heading-row">
                <td>Meal</td>
                <td>Items</td>
              </tr>
            </thead>
            <tbody>
              {plan.plan.map((entry, idx) => (
                <tr key={idx} className={entry.meal === 'Total' ? 'total' : 'plan-row'}>
                  <td>{entry.meal}</td>
                  <td>{Array.isArray(entry.plan) ? entry.plan.join(', ') : entry.plan}</td>
                </tr>
                
              ))}
            </tbody>
          </table>
        </article>
      ))}
    </section>
  </main>
  
  );
};

export default MealPlanning;

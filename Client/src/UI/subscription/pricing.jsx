import React from 'react';
import "../../styles/pricing.css";
import { useNavigate } from 'react-router-dom';
import pricingPlans from '../../data/pricingplans';
import PricingCard from '../../component/pricingcard';

const Pricing = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/payment");
  };

  return (
    <section id="membership">
      <div className="container">
        <div className="pricing__top">
          <h2 className="section__title">
            Premium <span className="highlights">Subscription</span> plan
          </h2>
          <p>
            Health & Fitness is a popular nutrition and exercise tracking app that offers a premium subscription service.<br />
            The premium version includes advanced nutrient tracking, customized goals and advice, and exclusive content.
          </p>
        </div>

        <div className="pricing__wrapper">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              title={plan.title}
              price={plan.price}
              duration={plan.duration}
              features={plan.features}
              onBuy={handleClick}
              highlight={index === 1} // Gold Member highlight
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

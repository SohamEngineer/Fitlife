import React from "react";
import { Button } from "./common/button";

const PricingCard = ({ title, price, duration, features, onBuy, highlight }) => {
  return (
    <div 
      className={`pricing__item ${highlight ? "pricing__item-02" : ""}`} 
      data-aos-duration="1500" 
      data-aos="fade-up"
    >
      <div className="pricing__card-top">
        <h2>{title}</h2>
        <h2 className="pricing">
          ${price} <span>{duration}</span>
        </h2>
      </div>

      <div className="services">
        <ul>
          {features.map((feature, idx) => (
            <li key={idx}>
              <span><i className="ri-checkbox-blank-circle-fill"></i></span>
              {feature}
            </li>
          ))}
        </ul>

        <Button className="register__btn" onClick={onBuy}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default PricingCard;

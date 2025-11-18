import React from "react";

const ExerciseCard = ({ img, title, description }) => {
  return (
    <div className="exercise__item" data-aos-duration="1500" data-aos="zoom-in">
      <span className="exercise__icon">
        <img src={img} alt={title} />
      </span>

      <div className="exercise__content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;

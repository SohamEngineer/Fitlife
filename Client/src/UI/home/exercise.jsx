import React from 'react';
import "../../styles/exercise.css";
import exerciseData from '../../data/exercise';
import ExerciseCard from '../../component/exercisecard';


const Exercise = () => {
  return (
    <section>
      <div className="container exercise__top">
        
        <div className="exercise__top">
          <h2 className="section__title">
            Benefits of <span className="highlights">Exercise</span>
          </h2>
          <p>
            Exercise is essential for maintaining a healthy body and mind,<br />
            and can improve quality of life in numerous ways.
          </p>
        </div>

        <div className="exercise__wrapper">
          {exerciseData.map((item) => (
            <ExerciseCard
              key={item.id}
              img={item.img}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Exercise;

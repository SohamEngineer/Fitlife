import React from 'react'
import "./style/start.css";
import { Button } from '../../component/common/button';
import { assets } from '../../assets/img/assets';

const Start = () => {
  return (
    <section>
      <div className="container">
        <div className="start__wrapper">
          <div className="start__img">
            <img src={assets.trainer} alt="err" />
          </div>

          <div className="start__content" data-aos-duration="1100" data-aos="fade-right">
            <h2 className="section__title">
              Ready to make <span className="highlights">Change?</span>
            </h2>

            <p>
              Remember, it's important to start slowly and gradually increase the intensity
              and duration of your exercise routine. Consult us as your healthcare provider
              before starting any new exercise program. Good luck, and enjoy the journey
              with us towards a healthier you!
            </p>

            <Button className="register__btn">Get Started</Button> 
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;

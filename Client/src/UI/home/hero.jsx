import React from 'react';
// import heroImg from "../../assets/img/model1-removebg-preview.png";
import "./style/hero.css";
import { Button } from '../../component/common/button';
import { assets } from '../../assets/img/assets';

const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__content">
            <h2 className='section__title' data-aos-duration="1000" data-aos="fade-up">
              Train smarter with your <span className="highlights">Fitlife</span> coach
            </h2>
            <p data-aos-duration="1100" data-aos="fade-up" data-aos-delay="100">
              Build a personal routine around your body, goals, schedule, and recovery.
              Fitlife blends guided workouts, nutrition support, and AI personalization so every session feels made for you.
            </p>

            <div className="hero__btns" data-aos-duration="1200" data-aos="fade-up" data-aos-delay="200">
              <Button className='register__btn'>Get Started</Button>
              <button className='watch_btn'>
                <span><i className="ri-play-fill"></i></span>Watch Video
              </button>
            </div>
          </div>

          <div className='hero__img'>
            <div className="hero__img-wrapper">
              <div className="box-01">
                <div className="box-02">
                  <div className="box-03">
                    <div className="box__img">
                      <img src={assets.home_model} alt="Hero" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="heart__rate" data-aos-duration="1100" data-aos="fade-right">
                <h5>Heart Rate</h5>
                <span><i className="ri-heart-pulse-fill"></i></span>
                <h6>100 BPM</h6>
              </div>

              <div className="gym__location" data-aos-duration="1100" data-aos="fade-up">
                <span><i className="ri-map-pin-2-fill"></i></span>
                <h5>Find our gym centers near you</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

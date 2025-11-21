import React from "react";
import signupimage from "../../../assets/img/signup.png";
import logo from "../../../assets/img/Health___Fitness.png";
import { GoArrowUpRight } from "react-icons/go";
import MuiSelect from "../../../component/common/select";
import "./style/signup.css"
import { useSignup } from "./hook/useSignup";
import { useNavigate } from "react-router-dom";
import InputField from "../../../component/common/input";
import { Button } from "../../../component/common/button";

const Signup = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  }
  const {
    step,
    formData,
    fitnessData,
    inputRefs,
    handleStep1Change,
    handleStep2Change,
    handleNext,
    handleSubmit,
  } = useSignup();

  return (
    <div className="signup-wrapper">
      <div className="signup-right">
        <div className="signup-top">
          <div className="signup-title">
            <img src={logo} alt="logo" />
            <span>Health & Fitness</span>
          </div>

          <p className="signup-footer" onClick={() => handleNavigate()}>
            Already have an account? Sign in <GoArrowUpRight />
          </p>
        </div>

        <div className="signup-paragraph">
          <p>
            {step === 1
              ? "Complete your basic details to get started"
              : "Add fitness information for personalized plans"}
          </p>
        </div>

        {step === 1 && (
          <form className="signup-form" onSubmit={handleNext}>
            <InputField
            label={"Full Name"}
              name="name"
              type="text"
              placeholder="Enter Your Name."
              value={formData.name}
              onChange={handleStep1Change}
              ref={inputRefs.name}
            />

            <InputField
            label={"Email"}
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleStep1Change}
              ref={inputRefs.email}
            />

            <InputField
            label={"Password"}
              name="password"
              type="password"
              placeholder="Enter Your Password."
              value={formData.password}
              onChange={handleStep1Change}
              ref={inputRefs.password}
            />

            <InputField
            label={"Repeat Password"}
              name="confirmPassword"
              type="password"
              placeholder="Enter Password Again"
              value={formData.confirmPassword}
              onChange={handleStep1Change}
              ref={inputRefs.confirmPassword}
            />

            <Button className="signup-btn">Next</Button>
          </form>
        )}

        {step === 2 && (
          <form className="fitness_form" onSubmit={handleSubmit}>
            <label className="signup-field-label">Gender</label>
            <MuiSelect
              name="gender"
              value={fitnessData.gender}
              onChange={handleStep2Change}
              options={[
                { value: "", label: "Select" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />

            <input
            label={"Date of Birth"}
              name="dateOfBirth"
              type="date"
              className="signup-input"
              value={fitnessData.dateOfBirth}
              onChange={handleStep2Change}
            />

            <div className="input-row">
              <div className="input-box">
                <InputField
                label={"Height (cm)"}
                  name="height"
                  type="text"
                  placeholder="Enter Height.."
                  value={fitnessData.height}
                  onChange={handleStep2Change} />

              </div>
              <div className="input-box">
                <InputField
                label={"Weight (kg)"}
                  name="weight"
                  type="text"
                  placeholder="Enter Weight.."
                  value={fitnessData.weight}
                  onChange={handleStep2Change} />

              </div>
            </div>

            <label className="signup-field-label">Fitness Level</label>
            <MuiSelect
              name="fitnessLevel"
              value={fitnessData.fitnessLevel}
              onChange={handleStep2Change}
              options={[
                { value: "", label: "Select" },
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
            />

            <label className="signup-field-label">Goal</label>
            <MuiSelect
              name="goal"
              value={fitnessData.goal}
              onChange={handleStep2Change}
              options={[
                { value: "", label: "Select" },
                { value: "weight_loss", label: "Weight Loss" },
                { value: "muscle_gain", label: "Muscle Gain" },
                { value: "maintain", label: "Maintain" },
                { value: "endurance", label: "Endurance" },
                { value: "strength", label: "Strength" },
              ]}
            />

            <label className="signup-field-label">Workout Preference</label>
            <MuiSelect
              name="workoutPreference"
              value={fitnessData.workoutPreference}
              onChange={handleStep2Change}
              options={[
                { value: "", label: "Select" },
                { value: "home", label: "Home" },
                { value: "gym", label: "Gym" },
                { value: "both", label: "Both" },
              ]}
            />

            <label className="signup-field-label">Body Fat %</label>
            <input
              name="bodyFat"
              type="text"
              className="signup-input"
              value={fitnessData.bodyFat}
              onChange={handleStep2Change}
            />
            <label className="signup-field-label">Daily Activity Level</label>
            <MuiSelect
              name="dailyActivityLevel"
              value={fitnessData.dailyActivityLevel}
              onChange={handleStep2Change}
              options={[{ value: "sedentary", label: "Sedentary" },
              { value: "light", label: "Light" },
              { value: "moderate", label: "Moderate" },
              { value: "active", label: "Active" },
              { value: "very_active", label: "Very Active" },
              ]} />
            <Button className="signup-btn">Complete Register</Button>
          </form>
        )}
      </div>

      <div className="signup-left">
        <img src={signupimage} alt="signup" />
        <h1>Accelerate your skills for competitive exams</h1>
        <p>Our personalized step-by-step guidance for the entire test preparation.</p>
      </div>
    </div>
  );
};

export default Signup;

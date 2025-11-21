import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Step2Validation, validateSignup } from "../../../../utils/signup.validator";
import { useNavigate } from "react-router-dom";
import { signupUserApi } from "../../../../api/auth.api";

export const useSignup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1 data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Step 2 data
  const [fitnessData, setFitnessData] = useState({
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    fitnessLevel: "",
    goal: "",
    workoutPreference: "",
    bodyFat: "",
    dailyActivityLevel: "sedentary",
  });

  // refs
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  // Step1 change
  const handleStep1Change = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step2 change
  const handleStep2Change = (e) => {
    setFitnessData({ ...fitnessData, [e.target.name]: e.target.value });
  };

  // Next button
  const handleNext = (e) => {
    e.preventDefault();

    const validation = validateSignup(formData);
    if (!validation.ok) {
      Swal.fire("Error", validation.message, "error");
      inputRefs[validation.field]?.current?.focus();
      return;
    }

    setStep(2);
  };

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation2 = Step2Validation(fitnessData);
    if (!validation2.ok) {
      Swal.fire("Error", validation2.message, "error");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: fitnessData.gender,
      dateOfBirth: fitnessData.dateOfBirth,
      height: Number(fitnessData.height),
      weight: Number(fitnessData.weight),
      fitnessLevel: fitnessData.fitnessLevel,
      goal: fitnessData.goal,
      workoutPreference: fitnessData.workoutPreference,
      bodyFat: fitnessData.bodyFat ? Number(fitnessData.bodyFat) : null,
      dailyActivityLevel: fitnessData.dailyActivityLevel,
    };

    try {
      await signupUserApi(payload);
      Swal.fire("Success", "Registration Successful!", "success");
      navigate("/");

      // reset everything
      setStep(1);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFitnessData({
        gender: "",
        dateOfBirth: "",
        height: "",
        weight: "",
        fitnessLevel: "",
        goal: "",
        workoutPreference: "",
        bodyFat: "",
        dailyActivityLevel: "sedentary",
      });
    } catch (error) {
      const message =
        error.response?.status === 409
          ? "Email already exists."
          : "Registration failed.";

      Swal.fire("Error", message, "error");
    }
  };

  return {
    step,
    setStep,
    formData,
    fitnessData,
    inputRefs,
    handleStep1Change,
    handleStep2Change,
    handleNext,
    handleSubmit,
  };
};

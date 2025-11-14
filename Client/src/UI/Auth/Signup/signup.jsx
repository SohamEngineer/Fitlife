import React, { useRef, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";
import "../../../styles/signup.css";
import Swal from "sweetalert2";

import { signupUserApi } from "../../../api/auth.api";
import { validateSignup } from "../../../utils/signup.validator";

const Signup = () => {
  // Controlled input state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Refs used for auto-focusing invalid fields
  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  // Handle controlled input updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validate input
    const validation = validateSignup(formData);

    if (!validation.ok) {
      Swal.fire("Error", validation.message, "error");

      // focus the invalid input field
      inputRefs[validation.field]?.current?.focus();
      return;
    }

    // 2. Prepare payload
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    // 3. API call
    try {
      await signupUserApi(payload);

      Swal.fire("Success", "Registration successful!", "success");

      // Reset form after success
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Handle API errors
      const message =
        error.response?.status === 409
          ? "Email already exists. Please login."
          : "Registration failed. Try again.";

      Swal.fire("Error", message, "error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="form-title">Sign up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="input-group">
            <FaUser className="signupicon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              ref={inputRefs.name}
            />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <FaEnvelope className="signupicon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              ref={inputRefs.email}
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <FaLock className="signupicon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              ref={inputRefs.password}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="input-group">
            <FaKey className="signupicon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              ref={inputRefs.confirmPassword}
            />
          </div>

          <button type="submit" className="submit-btn">
            REGISTER
          </button>
        </form>
      </div>

      {/* Illustration Image */}
      <div className="signup-image">
        <img
          alt="Illustration"
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
        />
      </div>
    </div>
  );
};

export default Signup;

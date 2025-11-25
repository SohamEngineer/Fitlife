import React, { useState } from "react";
import "./style/forgot.css";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaArrowLeft, FaLock } from "react-icons/fa6";
import { validateForgotEmail } from "../../../../utils/password.validator";
import { sendOtpApi } from "../../../../api/password.api";
import { Button } from "../../../../component/common/button";
import InputField from "../../../../component/common/input";

const ForgotPassword = () => {
  // Controlled input state
  const [email, setEmail] = useState("");

  // Loader for OTP request
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle OTP sending process
  const handleSendOtp = async (e) => {
    e.preventDefault();

    // Step 1: Validate email
    const validation = validateForgotEmail(email);
    if (!validation.ok) {
      Swal.fire("Error!", validation.message, "warning");
      return;
    }

    setLoading(true);

    try {
      // Step 2: API request to send OTP
      await sendOtpApi(email);

      // Step 3: Store email for next step (OTP page)
      localStorage.setItem("resetEmail", email);

      // Step 4: Navigate to OTP page
      navigate("/verify-otp");

    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "OTP sending failed!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Navigate back to login
  const goToLogin = () => navigate("/");

  return (
    <div className="page-container">
    <div className="forgot-container">

      {/* Icon */}
      <div className="forgoticon">
        <FaLock />
      </div>

      <h2 className="forgot-title">Forgot Password</h2>

      {loading ? (
        // Loader Animation
        <div className="lottie-loader">
          <DotLottieReact
            src="https://lottie.host/da0b53f0-64b1-42c7-98bd-acb9e42de9ff/hwil6zpnoY.lottie"
            autoplay
            loop
            style={{ width: 150, height: 150 }}
          />
          <p>Sending OTP...</p>
        </div>
      ) : (
        // Form UI
        <form className="forgot-form" onSubmit={handleSendOtp}>
          <InputField
            lable="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" >
            Submit
          </Button>

          <button type="button" onClick={goToLogin} className="back-btn">
            <FaArrowLeft /> Back to Login
          </button>
        </form>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;

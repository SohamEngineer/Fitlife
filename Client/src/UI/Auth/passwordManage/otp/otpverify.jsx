import React, { useState, useEffect } from "react";
import "../../../../styles/otpverify.css";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaFingerprint } from "react-icons/fa6";
import { validateOtp } from "../../../../utils/otp.validator";
import { resendOtpApi, verifyOtpApi } from "../../../../api/password.api";

const VerifyOTP = () => {
  // OTP stored as array of 6 digits
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // Timer countdown
  const [timeLeft, setTimeLeft] = useState(60);

  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  // Auto countdown for resend timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle OTP input changes
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Only allow digits

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus next box
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // OTP verification
  const handleVerify = async (e) => {
    e.preventDefault();

    // Step 1 — validate OTP
    const validation = validateOtp(otp);
    if (!validation.ok) {
      Swal.fire("Warning", validation.message, "warning");
      return;
    }

    try {
      // Step 2 — API call
      const res = await verifyOtpApi(email, validation.otp);

      // Step 3 — store reset token
      localStorage.setItem("resetToken", res.token);

      Swal.fire("Success!", "OTP Verified Successfully", "success");

      navigate("/reset-password");
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "OTP verification failed",
        "error"
      );
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    try {
      await resendOtpApi(email);

      Swal.fire("Success!", "OTP resent successfully", "success");

      // Reset timer and clear OTP fields
      setTimeLeft(60);
      setOtp(new Array(6).fill(""));

      document.getElementById("otp-0")?.focus();
    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to resend OTP",
        "error"
      );
    }
  };

  return (
    <div className="otp-container">

      <div className="finger">
        <FaFingerprint />
      </div>

      <h2 className="otp-title">OTP Verification</h2>
      <p className="otp-info">Enter the 6-digit OTP sent to your email</p>

      <form onSubmit={handleVerify} className="otp-form">
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="otp-box"
            />
          ))}
        </div>

        {timeLeft > 0 ? (
          <p className="otp-timer">Time left: {timeLeft}s</p>
        ) : (
          <button type="button" className="resend-btn" onClick={handleResendOtp}>
            Resend OTP
          </button>
        )}

        <button type="submit" className="otp-button">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './otpVerify.css';
import Swal from 'sweetalert2';
import { FaFingerprint } from "react-icons/fa6";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length < 6) {
      Swal.fire("Warning", "Please enter the complete 6-digit OTP", "warning");
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/passwordchange/verify-otp', {
        email,
        otp: enteredOtp,
      });
      localStorage.setItem('resetToken', res.data.token);
      Swal.fire("Success!", "OTP Verified Successfully", "success");
      navigate('/reset-password');
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || 'OTP verification failed', "error");
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('http://localhost:8000/api/passwordchange/send-otp', { email });
      Swal.fire("Success!", "OTP resent successfully", "success");
      setTimeLeft(60);
      setOtp(new Array(6).fill(''));
      document.getElementById("otp-0")?.focus();
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Failed to resend OTP", "error");
    }
  };

  return (
    <div className="otp-container">
    <div className='finger'>
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

        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
    </div>
  );
};

export default VerifyOTP;

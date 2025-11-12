import React, { useState } from 'react';
import './forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaArrowLeft } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire("Error!", "Email field cannot be empty", "warning");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/passwordchange/send-otp", { email });
      localStorage.setItem('resetEmail', email);
      navigate("/verify-otp");
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "OTP sending error", "error");
    } finally {
      setLoading(false);
    }
  };
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="forgot-container">
      <div className='forgoticon'>

      <FaLock />
      </div>
        <h2 className="forgot-title">Forgot Password</h2>

        {loading ? (
          <div className="lottie-loader">
            <DotLottieReact
               src="https://lottie.host/da0b53f0-64b1-42c7-98bd-acb9e42de9ff/hwil6zpnoY.lottie"
              autoplay
              loop
              style={{ width: 150, height: 150  }}
            />
            <p>Sending OTP...</p>
          </div>
        ) : (
          <form className="forgot-form" onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="forgot-input"
            />
            <button type="submit" className="forgot-button" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
            <button onClick={goToLogin} className="back-btn"><span><FaArrowLeft /></span> Back to Login</button>
          </form>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;

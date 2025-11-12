import React, { useState } from 'react';
import axios from 'axios';
import './resetpass.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('resetToken');

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      alert('Please fill in both fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/passwordchange/reset-password', {
        token,
        newPassword,
      });

      alert('Password changed successfully');
      localStorage.removeItem('resetEmail');
      localStorage.removeItem('resetToken');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="reset-container">
      <h2>Enter New Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className='changebtn' onClick={handleReset}>Change Password</button>
      <button onClick={goToLogin} className="back-btn"><span><FaArrowLeft /></span> Back to Login</button>
    </div>
  );
};

export default ResetPassword;

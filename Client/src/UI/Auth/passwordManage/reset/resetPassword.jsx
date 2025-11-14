import React, { useState } from "react";
import "../../../../styles/resetpassword.css";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { validateResetPassword } from "../../../../utils/reset.validator";
import { resetPasswordApi } from "../../../../api/password.api";

const ResetPassword = () => {
  // Controlled input state for new and confirm password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("resetToken");

  // Handle password reset process
  const handleReset = async () => {
    // Step 1: Validate input fields
    const validation = validateResetPassword(newPassword, confirmPassword);
    if (!validation.ok) {
      Swal.fire("Error!", validation.message, "warning");
      return;
    }

    try {
      // Step 2: API request
      await resetPasswordApi(token, newPassword);

      Swal.fire("Success!", "Password changed successfully", "success");

      // Step 3: Cleanup stored email/token
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetToken");

      navigate("/login");

    } catch (err) {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
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

      <button className="changebtn" onClick={handleReset}>
        Change Password
      </button>

      <button onClick={() => navigate("/login")} className="back-btn">
        <FaArrowLeft /> Back to Login
      </button>
    </div>
  );
};

export default ResetPassword;

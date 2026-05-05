// pages/auth/login/hook/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../../../context/authcontext";
import { loginUserApi } from "../../../../api/auth.api";

export const useLogin = () => {
  const [loginuser, setLoginUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUserApi(loginuser);

      const { token, user } = response;

      // HARD GUARD
      if (!token) {
        throw new Error("Token not returned from server");
      }

      // Store token ONCE
      localStorage.setItem("token", token);

      // Store user via context
      login(user);

      Swal.fire("Success!", "Login successful", "success");
      navigate(user.profileComplete ? "/dashboard" : "/onboarding");
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.response?.data?.message || error.message || "Login failed",
        "error"
      );
    }
  };

  return {
    loginuser,
    handleChange,
    handleLogin,
  };
};

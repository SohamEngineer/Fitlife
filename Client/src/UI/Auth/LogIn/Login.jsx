import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../../utils/AuthContext";
const Login = () => {
  const [loginuser, setLoginUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginuser, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", loginuser);

      if (res.status === 200) {
        const { token, user } = res.data;

        // Store token and user data
        localStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));

        // Set auth user in context
        login(user);

        Swal.fire("Success!", "Login successful", "success");

        navigate("/");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="content-container">
          <div className="image-container">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Illustration of hands working on a computer"
            />
          </div>
          <div className="form-container">
            <h2>Sign in with</h2>
            <div className="social-buttons">
              <button className="facebook">
                <FaFacebookF />
              </button>
              <button className="twitter">
                <FaTwitter />
              </button>
              <button className="linkedin">
                <FaLinkedinIn />
              </button>
            </div>
            <div className="divider">
              <hr />
              <span>Or</span>
              <hr />
            </div>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={loginuser.email}
                onChange={handleChange}
                
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginuser.password}
                onChange={handleChange}
                
              />
              <div className="options">
                
               <NavLink to="/forgotpassword"> Forgot password?</NavLink>
              </div>
              <button type="submit" className="login-btn">
                LOGIN
              </button>
            </form>
            <div className="register-link">
              <span>
                Don't have an account?{" "}
                <NavLink to="/signup">
                  Register
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

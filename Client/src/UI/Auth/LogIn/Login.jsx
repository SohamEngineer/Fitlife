import React from "react";
import "./style/login.css";
import { NavLink } from "react-router-dom";
import InputField from "../../../component/common/input";
import { Button } from "../../../component/common/button";
import logo from "../../../assets/img/Health___Fitness.png";
import { useLogin } from "./hook/useLogin";

const Login = () => {
  const { loginuser, handleChange, handleLogin } = useLogin();

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="content-container">
          <div className="form-container">
            <div className="login-title">
              <img src={logo} alt="logo" />
              <span>Health & Fitness</span>
            </div>

            <form onSubmit={handleLogin}>
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email address"
                className="input-form"
                value={loginuser.email}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                className="input-form"
                value={loginuser.password}
                onChange={handleChange}
              />

              <div className="options">
                <NavLink to="/forgotpassword">Forgot password?</NavLink>
              </div>

              <Button type="submit" className="signup-btn">
                LOGIN
              </Button>
            </form>

            <div className="register-link">
              <span>
                Don't have an account?{" "}
                <NavLink to="/signup">Register</NavLink>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

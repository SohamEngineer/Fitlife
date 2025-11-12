import React, { useRef, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import './signup.css';
import axios from "axios";
import Swal from 'sweetalert2';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validName = useRef(null);
  const validEmail = useRef(null);
  const validPassword = useRef(null);
  const validConfirmPassword = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      Swal.fire("Error", "Please Enter Your Name", "error");
      validName.current?.focus();
      return;
    }
  
    if (!formData.email) {
      Swal.fire("Error", "Please Enter Your Email", "error");
      validEmail.current?.focus();
      return;
    }
  
    if (!formData.password) {
      Swal.fire("Error", "Please Enter Password", "error");
      validPassword.current?.focus();
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      validConfirmPassword.current?.focus();
      return;
    }

  if (!formData.name || !formData.email || !formData.password) {
    Swal.fire("Error", "All fields are required", "error");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    Swal.fire("Error", "Passwords do not match", "error");
    return;
  }

  try {
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const responce = await axios.post("http://localhost:8000/api/auth/signup", payload);

    if (responce.status === 201) {
      Swal.fire("Success", "Registration Successful", "success");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    }
  } catch (error) {
    if (error.response?.status === 409) {
      Swal.fire("Error", "Email already exists. Please login.", "error");
    } else {
      Swal.fire("Error", "Registration Failed. Try Again.", "error");
    }
  }
};


  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="form-title">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className=" signupicon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              ref={validName}
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="signupicon" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              ref={validEmail}
            />
          </div>

          <div className="input-group">
            <FaLock className="signupicon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              ref={validPassword}
            />
          </div>

          <div className="input-group">
            <FaKey className="signupicon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              ref={validConfirmPassword}
            />
          </div>

          <button type="submit" className="submit-btn">
            REGISTER
          </button>
        </form>
      </div>

      <div className="signup-image">
        <img
          alt="Illustration of a person with geometric shapes"
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
        />
      </div>
    </div>
  );
};

export default Signup;

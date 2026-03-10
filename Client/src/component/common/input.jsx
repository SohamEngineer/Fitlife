import React, { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/component-style/input.css";

const InputField = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      placeholder = "",
      value,
      onChange,
      className = "",
      inputClass = "",
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`input-field-wrapper ${className}`}>
        {label && <label className="signup-field-label">{label}</label>}

        <div className="input-wrapper">
          <input
            ref={ref}
            name={name}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            className={`signup-input ${inputClass}`}
            value={value}
            onChange={onChange}
            {...rest}
          />

          {isPassword && (
            <span className="password-toggle" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
import React from "react";
import "../../styles/component-style/input.css"
const InputField = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  inputClass = "",
  ...rest
}) => {
  return (
    <div className={`input-field-wrapper ${className}`}>
      {label && <label className="signup-field-label">{label}</label>}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`signup-input ${inputClass}`}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default InputField;

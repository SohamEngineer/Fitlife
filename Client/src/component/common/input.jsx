import React, { forwardRef } from "react";
import "../../styles/component-style/input.css";

const InputField = forwardRef(({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  inputClass = "",
  ...rest
}, ref) => {
  return (
    <div className={`input-field-wrapper ${className}`}>
      {label && <label className="signup-field-label">{label}</label>}

      <input
        ref={ref} 
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
});

export default InputField;

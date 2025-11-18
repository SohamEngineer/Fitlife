import React from "react"; 
import "../../styles/component-style/button.css";
export const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`register__btn ${className}`}
    >
      {children}
    </button>
  );
};

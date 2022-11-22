import React from "react";
import "./Styles/Input.css";
const Input = ({
  _height,
  _width,
  onChangeHandler,
  type,
  label,
  placeholder,
  id,
  value,
  name,
  errorToggle,
}) => {
  const inputSize = {
    height: _height,
    width: _width,
    border: errorToggle ? "solid 2px var(--error-red)" : "none",
  };
  return (
    <div>
      <div className="input-container">
        <label className="custom-label" htmlFor={id}>
          {label}
        </label>
        <input
          className="custom-input"
          style={inputSize}
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          value={value}
          onChange={onChangeHandler}
        />
      </div>
    </div>
  );
};

export default Input;

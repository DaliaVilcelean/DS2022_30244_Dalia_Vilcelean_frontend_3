import React from "react";
import "./Styles/Button.css";
const Button = ({
  _height,
  _width,
  _color,
  _fontSize,
  _background,
  _border,
  _borderRadius,
  text,
  image,
  _padding,
  _margin,
  onClickFunction,
}) => {
  const buttonStyle = {
    height: _height,
    width: _width,
    color: _color,
    background: _background,
    fontSize: _fontSize,
    padding: _padding,
    margin: _margin,
    border: _border,
    borderRadius: _borderRadius,
  };
  return (
    <button
      style={buttonStyle}
      className="custom-button"
      onClick={onClickFunction}
    >
      {text}
    
    </button>
  );
};

export default Button;

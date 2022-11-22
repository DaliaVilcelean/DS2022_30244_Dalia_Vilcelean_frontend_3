import React from "react";
import "./Styles/Select.css";
import { v4 as uuid } from 'uuid';
const Select = ({
  placeholder,
  options,
  handleChange,
  background,
  name,
  selectedValue,
  errorToggle,
}) => {
  const selectStyle = background
    ? {
        background: background,
        paddingLeft: "40px",
        border: errorToggle ? "solid 2px var(--error-red)" : "none",
      }
    : { border: errorToggle ? "solid 2px var(--error-red)" : "none" };

  return (
    <select
      style={selectStyle}
      className="select-component"
      name={name}
      onChange={handleChange}
      value={selectedValue ? selectedValue : ""}
    >
      {!selectedValue && (
        <option key={uuid()} value="" disabled id="empty-option">
          {placeholder}
        </option>
      )}
      {options.map((option) => {
        return (
          <option className="option-comp" key={uuid()} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;

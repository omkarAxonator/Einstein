// Text.jsx
import React from "react";

function Text({ placeholder, name, id, onChange, value, required = false }) {
  return (
    <input
      className="form-control"
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}

export default Text;

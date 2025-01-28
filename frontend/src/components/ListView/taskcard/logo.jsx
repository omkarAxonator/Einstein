import React from "react";
import "./Logo.css"; // Import CSS for hover effect

function Logo({ src, onEditClick, size}) {
  return (
    <div className="position-relative d-inline-block w-auto h-auto">
      <img
        src={src}
        className="p-1 rounded-circle logo-img"
        alt="Company Logo"
        style={{ width: size, height: size, cursor: "pointer",objectFit: "contain" }}
        onClick={onEditClick}
      />
    </div>
  );
}

export default Logo;

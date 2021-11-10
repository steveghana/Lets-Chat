import React from "react";
import "./spinner.scss";
function Spinner({ bg }) {
  return (
    <div className="parent-circle" style={{ margin: "auto" }}>
      <div className="spinner1" style={{ backgroundColor: bg }}></div>
      <div className="spinner2" style={{ backgroundColor: bg }}></div>
    </div>
  );
}

export default Spinner;

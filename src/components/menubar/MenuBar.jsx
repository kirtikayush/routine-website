import React from "react";
import "./MenuBar.css";

const MenuBar = ({ onLogout }) => {
  return (
    <div className="menu-bar">
      <div className="menu-left">
        <h2 className="logo">Routine Website</h2>
      </div>

      <div className="menu-right">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default MenuBar;

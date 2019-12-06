import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#1347d6" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Search
      </NavLink>
      {" | "}
      <NavLink to="/cards" activeStyle={activeStyle}>
        Cards
      </NavLink>      
    </nav>
  );
};

export default Header;

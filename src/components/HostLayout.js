import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="/foods"
          isActive={(match) => match && match.isExact}
          style={activeStyles}
        >
          Foods
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;

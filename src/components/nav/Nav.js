import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">My Dashboard</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/homework/all">My Homework</Link>
        <Link to="/homework/write">Write</Link>
      </div>
    </nav>
  );
};

export default Navbar;

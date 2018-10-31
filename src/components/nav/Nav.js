import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">My Dashboard</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/homework/all">My Homework</Link>
      <Link to="/homework/write">Write</Link>
    </nav>
  );
};

export default Navbar;

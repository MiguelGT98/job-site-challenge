import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between px-8 py-3 bg-gray-800 shadow text-white">
      <Link className="font-medium" to="/">
        Job portal ✨
      </Link>
      <ul>
        <li>Sign in</li>
      </ul>
    </nav>
  );
};

export default Header;

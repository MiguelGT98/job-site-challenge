import React from "react";
import { Link } from "react-router-dom";
import { useAuth, signOut } from "../auth/useAuth";

const Header = () => {
  // This checks if the user is authenticated
  const user = useAuth();

  return (
    <nav className="flex justify-between px-8 py-3 bg-gray-800 shadow text-white">
      <Link className="font-medium" to="/">
        Job portal ✨
      </Link>
      <ul className="flex">
        {user ? (
          <>
            <li className="ml-4">{user.name}</li>
            <li onClick={signOut} className="ml-4 cursor-pointer">
              Log out
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({ link, index, handleLinkClick, activeLink }) => {
  return (
    <Link
      key={index}
      to={link.path}
      className={`text-gray-700 text-xl ${
        activeLink === link.name ? "text-yellow-500 font-semibold" : ""
      } hover:text-yellow-500`}
      onClick={() => handleLinkClick(link.name)}
    >
      {link.name}
    </Link>
  );
};

export default NavLink;

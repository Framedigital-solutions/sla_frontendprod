import React, { memo, useEffect, useState } from "react";
import {
  FaUser,
  FaHeart,
  // FaShoppingBag,
  // FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext";
import { userStore } from "../../store/userStore";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const { cartCount, clearCart } = useCart();
  const clearToken = userStore((state) => state.setClearToken);
  const navToken = userStore((state) => state?.token);
  const navigate = useNavigate();

  const handleLinkClick = (linkName) => {
    if (linkName === "Logout") {
      handleLogout();
    }

    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "What's New", path: "/" },
    { name: "About", path: "/about" },
    { name: "Shop", path: "/Shop" },
    { name: "Cart", path: "/cart" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: navToken ? "Logout" : "Login", path: "/login" },
    // !navToken && { name: "Signup", path: "/signup" },
  ];

  const handleLogout = () => {
    clearToken();
    clearCart();
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && storedToken !== "null") {
      userStore.getState().setUserToken(storedToken); // important!
    }
  }, []);
  return (
    <div className="">
      {/* Top bar */}
      <div className="bg-[#6E3000] text-white text-center py-2 text-lg">
        Free express worldwide shipping. Subscribe to discover
      </div>

      {/* Main navigation */}
      <div className="bg-[#E9F1ED] px-6  flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src="logone.png"
            alt="Logo"
            className="h-20 sm:h-20 md:h-24 lg:h-28 w-auto max-w-none"
          />
        </Link>

        {/* Mobile & Tablet Menu Button */}
        <button
          className="lg:hidden text-gray-700 text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Search Bar */}
        {/* <div className="hidden lg:flex justify-center w-full lg:w-1/3">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="border border-[#C1C1C1] rounded-lg bg-[#E9F1ED] pl-12 pr-4 py-3 w-full focus:outline-none text-lg"
            />
          </div>
        </div> */}

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link, index) => {
            return (
              <NavLink
                key={index}
                link={link}
                index={index}
                handleLinkClick={handleLinkClick}
                activeLink={activeLink}
              />
            );
          })}
        </div>

        {/* Icons */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/profile" className="text-gray-700">
            <FaUser className="text-2xl" />
          </Link>
          <div className="relative">
            <Link
              to="/wishlist"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-pink-100  transition-all duration-200"
            >
              <FaHeart className="text-pink-500" />
              <span>Favorites</span>
            </Link>
          </div>
          {/* cart icon */}
          {/* <div className="relative">
            <Link to="/cart" className="text-gray-700">
              <FaShoppingBag className="text-2xl" />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#A45B32] text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div> */}
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#E9F1ED] p-6 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="block text-gray-700 text-lg hover:text-yellow-500"
              onClick={() => handleLinkClick(link.name)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Navbar);

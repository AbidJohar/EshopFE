/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowSearch, getTotalCount, setToken, token, setCartItems } =
    useContext(ShopContext);
  const [activeLink, setActiveLink] = useState("");
  const [isSideBarActive, setIsSideBarActive] = useState(false);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const location = useLocation();

  const handleClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    setVisibleSearch(false);
    if (location.pathname === "/collection") {
      setVisibleSearch(true);
    }
  }, [location]);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center shadow-sm  justify-between py-5 font-medium">
      {/* Navbar logo */}
      <NavLink to="/">
        <img src={assets.logo} className="w-32" alt="logo" />
      </NavLink>

      {/* Navbar anchor tags for linking */}
      <ul className="hidden sm:flex gap-5 text-md text-gray-600">
        {["HOME", "COLLECTION", "ABOUT", "CONTACT"].map((link) => (
          <li key={link} className="relative">
            <NavLink
              to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
              className={`${activeLink === link ? "text-gray-900" : ""}`}
              onClick={() => handleClick(link)}
            >
              {link}
            </NavLink>
            {activeLink === link && (
              <span className="absolute left-0 bottom-[-2px] w-full h-[1.6px] bg-gray-800 transition-all duration-300"></span>
            )}
          </li>
        ))}
      </ul>

      {/* Navbar for icons like search, cart, etc. */}
      <div className="flex items-center gap-4">
        {visibleSearch && (
          <img
            onClick={() => setShowSearch((prev) => !prev)}
            className="w-5"
            src={assets.search_icon}
            alt="search"
          />
        )}
        {/* Dropdown menu for profile */}
        <div className="group relative">
          <Link to={"/login"}>
            <img
            onClick={()=> token ? null : navigate('/login')}
              className="w-5 cursor-pointer"
              src={assets.profile_icon}
              alt="Profile Icon"
            />
          </Link>
          {token && (
            <div className="group-hover:block hidden absolute right-0 mt-0 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-48">
              <div className="flex flex-col px-4 py-3">
                <p className="py-1 px-4 hover:bg-gray-700 rounded-md cursor-pointer transition duration-200 ease-in-out hover:text-white">
                  My Profile
                </p>
                <p onClick={()=> navigate('/orders')} className="py-1 px-4 hover:bg-gray-700 rounded-md cursor-pointer transition duration-200 ease-in-out hover:text-white">
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className="py-1 px-4 hover:bg-gray-700 rounded-md cursor-pointer transition duration-200 ease-in-out hover:text-white"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart with item count */}
        <Link to="/cart" className="relative">
          <img className="w-5" src={assets.cart_icon} alt="cart-icon" />
          <p className="absolute flex items-center text-sm justify-center right-[-13px] top-0 rounded-full w-5 h-4 bg-black text-white text-center">
            {getTotalCount()}
          </p>
        </Link>

        {/* Hamburger menu icon for small screens */}
        <img
          onClick={() => setIsSideBarActive(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="menu-icon"
        />
      </div>

      {/* Sidebar for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-gray-800 text-white  transition-all duration-300 ${
          isSideBarActive ? "w-full" : "w-0"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          <img
            onClick={() => setIsSideBarActive(false)}
            className="w-4 cursor-pointer"
            src={assets.dropdown_icon}
            alt="dropdown"
          />
          <p className="text-xl font-semibold">Menu</p>
        </div>

        {/* Sidebar links */}
        <div className="flex flex-col items-center gap-4 text-lg">
          {["Home", "Collection", "About", "Contact"].map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase()}`}
              className="py-2 px-4 w-full text-center hover:bg-gray-700 rounded-md"
              onClick={() => {
                handleClick(link);
                setIsSideBarActive(false); // Close sidebar after clicking a link
              }}
            >
              {link}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

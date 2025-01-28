/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const SearchBar = () => {
  const { search,products, setSearch, showSearch, setShowSearch} =
    useContext(ShopContext);

      const applySearch = () => {
        const searchTerm = search.toLowerCase();
        return products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm)
        );
      };

  return showSearch ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm text-center flex items-center justify-center z-50">
      {/* Search Bar Container */}
      <div className="relative w-11/12 max-w-lg mx-auto">
        <div className="relative flex items-center bg-gradient-to-r from-gray-600 to-gray-400 shadow-2xl rounded-full px-6 py-4">
          {/* Search Icon */}
          <img src={assets.search_icon} alt="Search Icon" className="w-5" />
          {/* Input Field */}
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none text-gray-800 placeholder-gray-300 ml-4 text-lg"
          />
          {/* Close Icon */}
          <img
            src={assets.cross_icon}
            alt="Close Icon"
            onClick={() => {
              setShowSearch(false);
              setSearch("");
            }}
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Enter Button Below Search Bar */}
        <button
          onClick={() => {
            // applySearch();
            setShowSearch(false);
          }}
          className="w-1/2 mt-4 py-2 bg-gradient-to-r from-gray-600 to-gray-400 text-white font-semibold rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          Enter
        </button>
      </div>
    </div>
  ) : null;
};

export default SearchBar;

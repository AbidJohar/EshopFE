/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white px-6">
      <img
        src={assets.notfoundimage}

        alt="404 Not Found"
        className="w-64 sm:w-96 animate-fadeIn"
      />
      <h1 className="text-4xl text-black/50 sm:text-5xl font-bold mt-6 animate-slideDown">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mt-2 animate-slideUp">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg text-lg font-medium hover:bg-gray-500 transition-all duration-300 animate-bounce"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

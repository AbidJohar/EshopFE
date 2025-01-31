import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const onSubmitHandler = (event) =>{
      event.preventDefault();
  }

  return (
    <div className="flex items-start mt-7 justify-center min-h-screen ">
      <div className="w-96 p-6  rounded-2xl">
        <h2 className=" prata-regular text-2xl font-semibold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-gray-500 text-white rounded-sm hover:bg-gray-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"} 
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? " Login" : " Sign Up"}
          </span>
        </p>
        <div className="relative flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button className="w-full flex justify-center items-center  mt-4 p-3 bg-white text-black rounded-sm border border-gray-300 hover:border-gray-800 hover:bg-gray-200 transition">
         <img className="w-6 mr-2" src={assets.google_icon} alt="google_icon" />   Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
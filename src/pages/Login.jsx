/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const { setToken, token, backend_url } = useContext(ShopContext);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const googleResponse = async (authresult) => {
    try {
      console.log("Google Auth Result:", authresult);

      if (!authresult || !authresult.code) {
        toast.error("Google login failed. No authorization code received.");
        return;
      }
      console.log("Authorization Code:", authresult.code);

      const response = await axios.post(`${backend_url}/api/v1/users/google-login`, {
        code: authresult.code
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message || "Google login failed.");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: (error) => {
      console.error("Google Login Error:", error);
      toast.error("Google login failed. Please try again.");
    },
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    redirect_uri: "http://localhost:3000/auth/google/callback",
  });
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const endpoint = isSignup ? "/register" : "/login";
      const payload = isSignup ? { name: username, email, password } : { email, password };
      const response = await axios.post(`${backend_url}/api/v1/users${endpoint}`, payload);

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("API Error:", err.response?.data?.message || err.message);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="flex items-start mt-7 justify-center min-h-screen">
      <div className="w-96 p-6 rounded-2xl">
        <h2 className="prata-regular text-2xl font-semibold text-center mb-6">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button
          onClick={googleLogin}
          className="w-full flex justify-center items-center mt-4 p-3 bg-white text-black rounded-sm border border-gray-300 hover:border-gray-800 hover:bg-gray-200 transition"
        >
          <img className="w-6 mr-2" src={assets.google_icon} alt="google_icon" /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
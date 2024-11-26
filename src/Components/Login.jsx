import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "./baseUrl";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import LoginImg from "../assets/LoginImg.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = `${BaseUrl}/admin/loginAdmin`;
    const payload = { email, password };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 200 || response.status === 201) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token);
        window.open("/", "_self");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-slate-100 h-screen w-screen flex items-center justify-center">
      <div className="flex h-[80%] w-[80%] bg-gray-900 text-gray-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Left Side - Image */}
        <div className="hidden lg:flex w-1/2 bg-gray-300">
          <img
            src={LoginImg}
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 bg-gray-50">
          <div className="w-[30vw] max-w-md p-8 bg-[#07553B] rounded-lg shadow-lg ">
            <h2 className="text-2xl font-bold text-[#CED46A] mb-6">LOGIN-PAGE</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#CED46A]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-[#CED46A]">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 pr-10"
                  required
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer mt-6"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#CED46A] text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>

            {/* Forgot Password Link */}
            <p
              className="mt-4 text-center text-sm text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/ForgotPassword")}
            >
              Forgot Password?
            </p>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

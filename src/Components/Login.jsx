import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "./baseUrl";
import { FaEyeSlash, FaEye } from "react-icons/fa";

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
        {/* Left Side - Image with Overlay */}
        <div
          className="hidden lg:flex flex-col justify-between w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')`,
          }}
        >
          <div className="p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">FINOVO</h1>
            <p className="text-lg">Capturing Moments, Creating Memories</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 bg-gray-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              LOGIN-PAGE{" "}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Not Registered Yet?{" "}
              <span
                onClick={() => navigate("/signUp")}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
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
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
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

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <span className="text-blue-500 cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Login
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-red-500">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

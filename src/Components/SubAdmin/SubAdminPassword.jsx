import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../baseUrl";
import { useNavigate, useLocation } from "react-router-dom";

const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL query
  const queryToken = new URLSearchParams(location.search).get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!queryToken) {
      alert("Required tokens are missing. Please log in again.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${BaseUrl}/admin/createPasswordSubAdmin`,
        { password, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${queryToken}`,
          },
        }
      );

      const { newToken } = response.data;

      if (newToken) {
        localStorage.setItem("token", newToken);
        alert("Password set successfully! Redirecting to login page...");
      } else {
        alert("Password set successfully! Please log in.");
      }
      navigate("/LoginPage");
    } catch (error) {
      console.error("Error submitting password:", error);
      alert(error.response?.data?.message || "Error submitting password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <form
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
        aria-label="Password Form"
      >
        <h2 className="text-xl font-semibold mb-4">Set Your Password</h2>

        {/* Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password Input"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle Password Visibility"
          >
            {showPassword ? "👁" : "🙈"}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            aria-label="Confirm Password Input"
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label="Toggle Confirm Password Visibility"
          >
            {showConfirmPassword ? "👁" : "🙈"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordPage;

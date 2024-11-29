import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../baseUrl";
import { useNavigate,useLocation } from "react-router-dom";



const PasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const subAdminToken = localStorage.getItem("subToken");
  const navigate = useNavigate();
  const location=useLocation();

console.log(location.search.split('=')[1])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subAdminToken) {
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
            Authorization: `Bearer ${location.search.split('=')[1]}`,
          },
        }
      );

      const { newToken } = response.data;
      if (newToken) {
        localStorage.setItem("token", newToken);
        alert("Password set successfully! Redirecting to login page...");
        navigate("/LoginPage");
      } else {
        alert("Password set successfully! Please log in.");
        navigate("/LoginPage");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error submitting password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <form
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-4">Set Your Password</h2>
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
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁" : "🙈"}
          </button>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁" : "🙈"}
          </button>
        </div>
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

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BaseUrl } from "../baseUrl";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `${BaseUrl}/admin/verifyEmailOTP/9`;
    const payload = { email, otp };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("OTP verified successfully!");
        navigate("/LoginPage");
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="mb-4 text-center">Please enter the 6-digit OTP sent to your email.</p>
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="w-full px-3 py-2 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-950"
          >
            Verify OTP
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default OtpPage;

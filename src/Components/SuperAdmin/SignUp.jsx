import React, { useState } from "react";
import { BaseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";


const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();


    const apiUrl = `${BaseUrl}/admin/signupSuperAdmin`;


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


      if (response.ok) {
        navigate("/OtpPage");
        setMessage("Signup successful! Please log in.");
        setEmail("");
        setPassword("");

      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        {/* <Navbar/> */}
        <h2 className="text-2xl font-bold mb-4"> Admin Signup Page</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-950"
          >
            Signup
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <div className="text-center mt-4">
          <p className="text-sm">
            Already Registered?{" "}
            <button
              onClick={() => navigate("/LoginPage ")}
              className="text-blue-500 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

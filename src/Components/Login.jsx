import React, { useState } from "react";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseUrl}/admin/loginSuperAdmin`, {
        email,
        password,
      });

      if (response.data.success) {

        console.log("Login successful!");
        navigate('/');
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login Admin Page</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-400 text-white py-2 rounded hover:bg-slate-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

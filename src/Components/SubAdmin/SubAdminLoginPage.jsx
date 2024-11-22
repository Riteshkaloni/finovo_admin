import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../baseUrl";


const SubAdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = `${BaseUrl}/admin/loginSubAdmin`;
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
        setMessage("Login successful!");
localStorage.setItem('token', data.token)
        window.open("/Navbar");
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[100vw]">
      <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login Sub Admin</h2>
        <form onSubmit={handleLogin}>
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
            className="w-full bg-slate-600 text-white py-2 rounded hover:bg-slate-950"
          >
            Login
          </button>
        </form>


        {message && <p className="mt-4 text-center text-red-500">{message}</p>}


        <div className="text-center mt-4">
          <p className="text-sm">
            Not registered yet?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
        <div className=" text-center mt-4 border-double b">
<p>Forget Password ?</p>
<button
              onClick={() => navigate("/ForgotPassword")}
              className="w-30 bg-slate-600 text-white rounded hover:bg-slate-950"
            >
              Click Here
            </button>
        </div>
      </div>
    </div>
  );
};

export default SubAdminLoginPage;

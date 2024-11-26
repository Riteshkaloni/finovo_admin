import React, { useEffect, useState } from "react";
import { BaseUrl } from "../baseUrl";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      if (savedToken) setToken(savedToken);
    } catch (error) {
      console.error("Error accessing local storage:", error);
    }
  }, []);

  const handleSendLink = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/admin/forgetPasswordAdmins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Password reset link sent to your email.");
        setEmailSent(true);
      } else {
        alert(data.error || "Failed to send reset link.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/admin/resetPasswordAdmins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password has been reset successfully!");
        setShowConfirmation(true);
      } else {
        alert(data.error || "Failed to reset password.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 h-full w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {!emailSent ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-700 mb-4">
              Enter your email address and we will send you a password reset
              link.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              onClick={handleSendLink}
              className="w-full py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-900"
            >
              Send Reset Link
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Reset Password
            </h2>
            <form onSubmit={handleResetPassword}>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  aria-label="Toggle new password visibility"
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showNewPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-800"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Success
              </h3>
              <p className="text-center text-gray-700 mb-4">
                Your password has been reset successfully!
              </p>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

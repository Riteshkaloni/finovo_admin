import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../baseUrl";

const UserManagement = () => {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");

  const token = "token";

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`${BaseUrl}/admin/getUserName`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          setMessage("Failed to fetch username");
        }
      } catch (error) {
        setMessage("Error fetching username");
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [token]);

  const updateUsername = async () => {
    try {
      const response = await fetch(`${BaseUrl}/admin/updateUserName`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername }),
      });

      if (response.ok) {
        setUsername(newUsername);
        setMessage("Username updated successfully");
        setNewUsername("");
      } else {
        setMessage("Failed to update username");
      }
    } catch (error) {
      setMessage("Error updating username");
      console.error("Error updating username:", error);
    }
  };

  return (
    <div className="justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[80vw]">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <p className="text-gray-700 mb-2">
          <strong>Current Username:</strong> {username || "Loading..."}
        </p>
        <div className="mt-4">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className="w-full border p-2 rounded mb-4"
          />
          <button
            onClick={updateUsername}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Update Username
          </button>
        </div>
        {message && <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      </div>
    </div>
  );
};

export default UserManagement;

import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../baseUrl";
import Header from "../../Header/Header";

const Block = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [message, setMessage] = useState("");

  const token = "YOUR_TOKEN_HERE"; // Replace with the actual token

  // Fetch Active Users
  const fetchActiveUsers = async () => {
    try {
      const response = await fetch(`${BaseUrl}/admin/getAllActiveUsersDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setActiveUsers(data.activeUsers || []);
      } else {
        setMessage("Failed to fetch active users.");
      }
    } catch (error) {
      setMessage("Error fetching active users.");
      console.error(error);
    }
  };

  // Fetch Blocked Users
  const fetchBlockedUsers = async () => {
    try {
      const response = await fetch(`${BaseUrl}/admin/getAllBlockedUsers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlockedUsers(data.blockedUsers || []);
      } else {
        setMessage("Failed to fetch blocked users.");
      }
    } catch (error) {
      setMessage("Error fetching blocked users.");
      console.error(error);
    }
  };

  // Block User
  const blockUser = async (userId) => {
    try {
      const response = await fetch(`${BaseUrl}/admin/blockUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        setMessage("User blocked successfully.");
        fetchActiveUsers(); // Refresh active users
        fetchBlockedUsers(); // Refresh blocked users
      } else {
        setMessage("Failed to block user.");
      }
    } catch (error) {
      setMessage("Error blocking user.");
      console.error(error);
    }
  };

  // Unblock User
  const unblockUser = async (userId) => {
    try {
      const response = await fetch(`${BaseUrl}/admin/unblockUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        setMessage("User unblocked successfully.");
        fetchActiveUsers(); // Refresh active users
        fetchBlockedUsers(); // Refresh blocked users
      } else {
        setMessage("Failed to unblock user.");
      }
    } catch (error) {
      setMessage("Error unblocking user.");
      console.error(error);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchActiveUsers();
    fetchBlockedUsers();
  }, []);

  return (
    <div className="justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[80vw]">
         <div className="flex items-center p-4 bg-gray-100">
        <Header />
      </div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">User Management Dashboard</h1>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {/* Active Users */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Active Users</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {activeUsers.length > 0 ? (
              activeUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Last Active:</strong> {new Date(user.last_active).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => blockUser(user.user_id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Block User
                  </button>
                </div>
              ))
            ) : (
              <p>No active users found.</p>
            )}
          </div>
        </div>

        {/* Blocked Users */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {blockedUsers.length > 0 ? (
              blockedUsers.map((user) => (
                <div
                  key={user.user_id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>
                  <button
                    onClick={() => unblockUser(user.user_id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Unblock User
                  </button>
                </div>
              ))
            ) : (
              <p>No blocked users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Block;

import React, { useEffect, useState } from "react";
import { BaseUrl } from "../baseUrl";
import Header from "../Header/Header";
import { MdBlockFlipped } from "react-icons/md";

const SubAdminProfile = () => {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${BaseUrl}/admin/getAllSubAdminsManagersEditors`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUsers(data.data); // Set users in state
      } else {
        alert(data.message || "Failed to fetch users");
      }
    } catch (error) {
      alert("An error occurred while fetching users");
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update username
  const handleUpdateUsername = async (userId, newUsername) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BaseUrl}/admin/updateUserName`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: newUsername, admin_id: userId }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Username updated successfully");
        fetchUsers(); // Refresh the user list after updating
      } else {
        alert(data.message || "Failed to update username");
      }
    } catch (error) {
      alert("An error occurred while updating the username");
      console.error(error);
    }
  };

  return (
    <div className="justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[80vw]">
      <div className="flex items-center p-4 bg-gray-100">
        <Header />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center">
        Sub Admin, Manage and Editor
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {users.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.admin_id} className="text-center">
                    <td className="border p-2">{user.admin_id}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">
                      {user.role.includes(1)
                        ? "SubAdmin"
                        : user.role.includes(2)
                        ? "Manager"
                        : user.role.includes(3)
                        ? "Editor"
                        : "Unknown"}
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        className="border rounded p-1 w-full"
                        defaultValue={user.username || ""}
                        onBlur={(e) =>
                          handleUpdateUsername(user.admin_id, e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        className="px-4 py-1 bg-red-300 text-white rounded hover:bg-red-600"
                      >
                        <MdBlockFlipped />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600">No users found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SubAdminProfile;

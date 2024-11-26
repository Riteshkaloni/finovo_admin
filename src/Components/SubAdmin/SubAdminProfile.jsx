import React, { useEffect, useState } from "react";
import { BaseUrl } from "../baseUrl";
import Header from "../Header/Header";
import { MdBlockFlipped } from "react-icons/md";

const SubAdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, settoken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      settoken(token);
    }

    fetchUsers();
  }, [token]);

  // Fetch users
  const fetchUsers = async () => {
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
        setUsers(data.data);
      } else {
        alert(data.message || "Failed to fetch users");
      }
    } catch (error) {
      alert("An error occurred while fetching users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update username
  const handleUpdateUsername = async (userId, newUsername) => {
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
        fetchUsers();
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
                      {user.role.includes(1) ? "Admin" : "Other"}
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        className="border rounded p-1 w-full"
                        defaultValue={user.username || ""}
                        onChange={(e) =>
                          setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                              u.admin_id === user.admin_id
                                ? { ...u, username: e.target.value }
                                : u
                            )
                          )
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        className="px-4 py-1 bg-lime-400 text-white rounded hover:bg-lime-900"
                        onClick={() =>
                          handleUpdateUsername(user.admin_id, user.username)
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td className="border p-2">
                      <button
                        className="px-4 py-1 bg-red-300 text-white rounded hover:bg-red-600"
                        onClick={() =>
                          handleUpdateUsername(user.admin_id, user.username)
                        }
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

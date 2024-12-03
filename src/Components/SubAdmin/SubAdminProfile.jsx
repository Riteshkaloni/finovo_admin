import React, { useEffect, useState } from "react";
import { BaseUrl } from "../baseUrl";
import Header from "../Header/Header";
import person from "../../assets/person.png"

const SubAdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <div className="justify-center items-center min-h-screen bg-gray-200 h-[100%] w-[80vw]">
      <div className="flex items-center p-4 bg-gray-100">
        <Header />
      </div>
      <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center">
        Sub Admin, Manager, and Editor
      </h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading users...</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {users.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">S.No</th>
                  <th className="border p-2">Profile</th>
                  <th className="border p-2">Email (ID)</th>
                  <th className="border p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.admin_id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">
                    <img
  src={person}
  alt="Profile"
  className="h-16 w-16 rounded-full mx-auto"
/>
                    </td>
                    <td className="border p-2">
                      {`${user.email} (ID: ${user.admin_id})`}
                    </td>
                    <td className="border p-2">
                      {user.role.includes(1)
                        ? "SubAdmin"
                        : user.role.includes(2)
                        ? "Manager"
                        : user.role.includes(3)
                        ? "Editor"
                        : "Unknown"}
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

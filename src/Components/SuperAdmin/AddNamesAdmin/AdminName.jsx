import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../baseUrl";

const AdminName = () => {
  const [adminName, setAdminName] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  // Fetch admin details
  const fetchAdminName = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`${BaseUrl}/admin/getAdminNames`, {
        method: "GET", // GET request to fetch the admin details
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.admin) {
        const { firstName, middleName, lastName } = data.admin;
        setFirstName(firstName);
        setMiddleName(middleName ?? "");
        setLastName(lastName);
        setAdminName(`${firstName} ${middleName ?? ""} ${lastName}`);
      } else {
        setError(data.message || "Failed to fetch admin details");
      }
    } catch (error) {
      setError("An error occurred while fetching admin details. Please try again.");
      console.error("Fetch Error:", error);
    }
  };

  // Fetch admin name on component mount
  useEffect(() => {
    fetchAdminName();
  }, []);

  // Handle form submission (for example, updating the admin name)
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to update the admin name using PUT request here.
    console.log("Updated Admin Name:", firstName, middleName, lastName);
  };

  return (
    <div className="p-4">

      <h1 className="text-lg font-semibold">Admin Details</h1>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter First Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Middle Name</label>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Middle Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter Last Name"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Admin Name
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminName;

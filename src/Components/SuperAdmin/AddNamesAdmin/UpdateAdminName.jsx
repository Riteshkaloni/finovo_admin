import React, { useState } from "react";
import { BaseUrl } from "../../baseUrl";

const UpdateAdminName = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authentication token is missing.");
      return;
    }


    if (!firstName || !middleName || !lastName) {
      setMessage("All fields are required.");
      return;
    }

    const updatedNames = {
      firstName,
      middleName,
      lastName
    };

    try {
      const response = await fetch(`${BaseUrl}/admin/updateAdminNames`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNames),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // "Admin name updated successfully"
      } else {
        setMessage(data.message || "Failed to update admin name");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Update Admin Name</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateAdminName;

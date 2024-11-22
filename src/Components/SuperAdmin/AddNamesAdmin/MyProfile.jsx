import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../baseUrl"; // Ensure BaseUrl is correctly imported
import Avatar from "../../../assets/Avatar.png";
import { FiEdit } from "react-icons/fi";
import Navbar from "../../Navbar/Navbar";
import Header from "../../Header/Header";

const MyProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchProfilePicture();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token is missing. Please log in.");
      return;
    }

    const apiUrl = `${BaseUrl}/admin/getAdminNames`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const { firstName, middleName, lastName } = data.admin;
        setFirstName(firstName);
        setMiddleName(middleName || "");
        setLastName(lastName);
      } else {
        setError("Failed to fetch profile details.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching profile details.");
    }
  };

  const fetchProfilePicture = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = `${BaseUrl}/admin/getProfilePictureAdmin`;
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImage(data.profilePicUrl);
      } else {
        setImage(null);
      }
    } catch (error) {
      console.error(error);
      setImage(null);
    }
  };

  const uploadProfilePicture = async (file) => {
    const token = localStorage.getItem("token");
    const apiUrl = `${BaseUrl}/admin/uploadProfilePictureAdmin`;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("Profile picture updated successfully!");
        fetchProfilePicture();
      } else {
        setError("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while uploading profile picture.");
    }
  };

  const removeProfilePicture = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = `${BaseUrl}/admin/removeProfilePictureAdmin`;

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage("Profile picture removed successfully!");
        setImage(null);
      } else {
        setError("Failed to remove profile picture.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while removing profile picture.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      uploadProfilePicture(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("profileImageInput").click();
  };

  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => handleImageChange(e);
    input.click();
  };

  const handleEditClick = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const token = localStorage.getItem("token");
    const apiUrl =
      firstName && lastName
        ? `${BaseUrl}/admin/updateAdminNames`
        : `${BaseUrl}/admin/addNameAdmins`;

    const payload = {
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
        setShowForm(false);
        fetchUserData(); // Reload the profile details
      } else {
        setError("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="flex-1 w-[78vw]">
          {/* Header positioned next to Navbar */}
          <div className="flex items-center p-4 bg-blue-900 text-white">
            <Header />
          </div>
          <h2 className="text-lg font-bold text-start  mt-4">
            Super Admin Profile
          </h2>
          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          {/* Profile Image and Details */}
          <div className="flex  px-10 space-x-4 mt-6 bg-white py-2 shadow-xl">
            <div className="relative">
              <img
                src={imagePreview || image || Avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-blue-300"
                onClick={handleImageClick}
              />
              <FiEdit
                onClick={() => setShowOptions((prev) => !prev)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full text-blue-600 cursor-pointer shadow"
              />

              {/* Dropdown options */}
              {showOptions && (
                <div className="absolute top-10 left-0 w-48 bg-blue-100 rounded-md shadow-lg py-2 z-10">
                  <button
                    onClick={handleCameraClick}
                    className="w-full text-left px-4 py-2 text-blue-800 hover:bg-blue-200 text-sm"
                  >
                    Photo from Device
                  </button>
                  <button
                    onClick={removeProfilePicture}
                    className="w-full text-left px-4 py-2 text-blue-800 hover:bg-blue-200 text-sm"
                  >
                    Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl text-blue-300">{`${firstName} ${middleName} ${lastName}`}</h3>
            </div>
            <FiEdit
              onClick={handleEditClick}
              className="cursor-pointer text-xl text-blue-300 ml-auto hover:text-blue-400"
            />
          </div>

          <div className="mt-2 bg-white shadow-xl py-2 px-10 h-24">

            <div className="flex justify-between">
            <p>First Name</p>
            <p>Second name</p>
            <p>Last NAme</p>
            </div>
          </div>

          {/* Form for editing profile details */}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 mt-6 max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-blue-100"
            >
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-blue-800"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="middleName"
                  className="block text-sm font-medium text-blue-800"
                >
                  Middle Name:
                </label>
                <input
                  type="text"
                  id="middleName"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-blue-800"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-3 py-2 mt-1 border rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Profile
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

import React, { useState, useEffect } from "react";
import { BaseUrl } from "../../baseUrl";
import Avatar from "../../../assets/Avatar.png";
import { FiEdit, FiX } from "react-icons/fi";
import Navbar from "../../Navbar/Navbar";
import Header from "../../Header/Header";
import finovoLogo from "../../../assets/finovoLogo.png";

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
        fetchUserData();
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
          <div className="flex items-center p-4 bg-blue-900 text-white">
            <Header />
          </div>
          <h2 className="text-lg font-bold text-start mt-4">
            Super Admin Profile
          </h2>
          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          {/* Profile Section with Cover Photo */}
          <div className="mt-6 bg-white shadow-xl relative">
            {/* Static Cover Photo */}
            <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-700 relative">
              <img
                src={finovoLogo}
                alt="Cover"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Profile Image and Details */}
          <div className="pt-6 relative font-bold">
            <div className="absolute -top-16 left-10">
              <div className="relative">
                <img
                  src={imagePreview || image || Avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-white"
                  onClick={handleImageClick}
                />
                <FiEdit
                  onClick={() => setShowOptions((prev) => !prev)}
                  className="absolute top-1 right-1 bg-white p-1 rounded-full text-blue-600 cursor-pointer shadow"
                />

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
            </div>

            <div className="ml-44">
              <h3 className="text-xl text-blue-800">{`${firstName} ${middleName} ${lastName}`}</h3>
            </div>

            {/* Static Admin Data Below Profile Image */}
            <div className="bg-blue-50 p-4 rounded-lg mt-4 ml-10 shadow-md">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-800">Super Admin:</span> A highly
                dedicated professional overseeing platform operations, ensuring smooth
                administration, and managing projects with precision.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Email:</strong> admin@kurmato.com | <strong>Contact:</strong> 987654321
              </p>
            </div>

            <FiEdit
              onClick={handleEditClick}
              className="absolute top-4 right-4 cursor-pointer text-xl text-blue-600 hover:text-blue-700"
            />
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 relative">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="firstName" className="block text-sm font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="middleName" className="block text-sm font-semibold">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="lastName" className="block text-sm font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </form>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-gray-500"
              >
                <FiX className="text-2xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

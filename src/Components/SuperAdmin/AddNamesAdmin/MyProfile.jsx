// // import React, { useEffect, useState, useRef } from "react";
// // import { BaseUrl } from "../../baseUrl";
// // import { CiEdit } from "react-icons/ci";
// // // import image from "../../../assets/Avatar-Profile-PNG-Pic.png";

// // const MyProfile = () => {
// //   const [profile, setProfile] = useState({
// //     firstName: "",
// //     middleName: "",
// //     lastName: "",
// //     image: "",
// //   });

// //   // const [editable, setEditable] = useState(false);
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [uploadMessage, setUploadMessage] = useState("");
// //   const [imageUrl, setImageUrl] = useState();

// //   const token = localStorage.getItem("adminAuth");

// //   const fileInputRef = useRef(null);

// //   // Function to fetch profile data
// // const fetchProfileData = async ( ) => {
// //     try {
// //       const response = await fetch(`${BaseUrl}/admin/getProfile`, {
// //         method: "GET",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to fetch profile data");
// //       }

// //       const data = await response.json();
// //       setProfile(data);
// //     } catch (error) {
// //       console.error("Error fetching profile data:", error);
// //     }
// //   };

// //   // Function to update profile data
// //   const updateProfileData = async () => {
// //     try {
// //       const response = await fetch(`${BaseUrl}/admin/addNameAdmins`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           firstName: profile.firstName,
// //           middleName: profile.middleName,
// //           lastName: profile.lastName,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to update profile");
// //       }

// //       const data = await response.json();
// //       setProfile(data);
// //       console.log("Profile updated successfully");
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //     }
// //   };

// //   // Fetch profile data on component mount
// //   useEffect(() => {
// //     fetchProfileData();
// //   }, []);


// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type.startsWith("image/")) {
// //       setSelectedFile(file);
// //       setImageUrl(URL.createObjectURL(file)); // Preview selected image
// //     } else {
// //       alert("Please select a valid image file.");
// //     }
// //   };

// //   const handleImageClick = () => {
// //     fileInputRef.current.click();
// //   };
// //   // Handle input change

// // const handleChange = (e) => {
// //   const { name, value } = e.target;
// //   setProfile((prevProfile) => ({
// //     ...prevProfile,
// //     [name]: value,
// //   }));
// // };

// //   const handleUpload = async () => {
// //     if (!selectedFile) {
// //       alert("Please select a file first!");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("profilePic", selectedFile);

// //     try {
// //       const response = await fetch(
// //         `${BaseUrl}/admin/uploadProfilePictureAdmin`,
// //         {
// //           method: "POST",
// //           body: formData,
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       const data = await response.json();

// //       // Check if the upload was successful
// //       if (data.status === "success") {
// //         const newImageUrl = data.profilePicUrl;
// //         setImageUrl(newImageUrl); // Update image preview
// //         // updateImageUrl(newImageUrl); // Update parent component if needed
// //         setUploadMessage(data.message);
// //       } else {
// //         setUploadMessage("Failed to upload profile picture.");
// //       }
// //     } catch (error) {
// //       console.error("Error uploading file:", error);
// //       setUploadMessage(
// //         "An error occurred while uploading the profile picture."
// //       );
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-20">
// //       <h2 className="text-xl font-semibold mb-4">My Profile</h2>
// //       <CiEdit />
// //       <div className="mb-4">
// //         <img
// //           // src={image }
// //           src={imageUrl || "https://via.placeholder.com/150"}
// //           alt="profile"
// // onClick={handleImageClick}
// //           className="w-32 h-32 rounded-full border-2 border-gray-300"
// //         />
// //       </div>
// //       <input
// //         type="file"
// //         accept="image/*"
// //         onChange={handleFileChange}
// //         className="mb-2"
// //       />
// //       <input
// //         type="text"
// //         name="firstName"
// //         value={profile.firstName}
// //         onChange={handleChange}
// //         placeholder="First Name"
// //         className="mb-2 p-2 border rounded w-full"
// //       />

// //       <input
// //         type="text"
// //         name="middleName"
// //         value={profile.middleName}
// //         onChange={handleChange}
// //         placeholder="Middle Name"
// //         className="mb-2 p-2 border rounded w-full"
// //       />
// //       <input
// //         type="text"
// //         name="lastName"
// //         value={profile.lastName}
// //         onChange={handleChange}
// //         placeholder="Last Name"
// //         className="mb-2 p-2 border rounded w-full"
// //       />

// //       <button
// //         onClick={handleUpload}
// //         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
// //       >
// //         Update Profile
// //       </button>
// //       {uploadMessage && <p className="mt-2 text-green-500">{uploadMessage}</p>}
// //     </div>
// //   );
// // };

// // export default MyProfile;


// import React, { useEffect, useState, useRef } from "react";
// import { BaseUrl } from "../../baseUrl";
// // import { CiEdit } from "react-icons/ci";

// const MyProfile = () => {
//   const [profile, setProfile] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     image: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const token = localStorage.getItem("adminAuth");
//   console.log(token,'---TOKEN----')
//   // Reference to file input for triggering click
//   const fileInputRef = useRef(null);

//   // Fetch profile data on component mount
//   useEffect(() => {
//     fetchProfileData();
//   }, []);


//   const handleUpdateProfile = async () => {
//     const updatedProfile = {
//       firstName: profile.firstName,
//       middleName: profile.middleName,
//       lastName: profile.lastName,
//     };

//     try {
//       const response = await fetch(`${BaseUrl}/admin/updateProfile`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert(data.message || "Profile updated successfully");
//         fetchProfileData(); // Refresh profile data after update
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("An error occurred while updating your profile.");
//     }
//   };

//   // Function to fetch profile data
//   const fetchProfileData = async () => {
//     try {
//       const response = await fetch(`${BaseUrl}/admin/getProfile`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
// // console.log(token,'function----')
// // console.log(body)
//       if (!response.ok) {
//         throw new Error("Failed to fetch profile data");
//       }

//       const data = await response.json();
//       setProfile(data);
//       setImageUrl(data.image || "https://via.placeholder.com/150");
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   // Function to update profile picture on file change
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setSelectedFile(file);
//       setImageUrl(URL.createObjectURL(file)); // Preview selected image
//     } else {
//       alert("Please select a valid image file.");
//     }
//   };

//   // Function to trigger file input click
//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   // Function to handle image upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profilePic", selectedFile);

//     try {
//       const response = await fetch(`${BaseUrl}/admin/uploadProfilePictureAdmin`, {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();

//       console.log(data)

//       if (response.ok && data.profilePicUrl) {
//         setImageUrl(data.profilePicUrl);
//         setUploadMessage(data.message || "profile picture updated" );

//         setProfile((prevProfile) => ({
//           ...prevProfile,
//           image: data.profilePicUrl,
//         }));
//       } else {
//         setUploadMessage("Failed to upload profile picture.");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setUploadMessage("An error occurred while uploading the profile picture.");
//     }
//   };

//   // Handle input change for text fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-20">
//       <h2 className="text-xl font-semibold mb-4">My Profile</h2>
//       <div className="relative">
//         {/* Clickable profile image */}
//         <img
//           src={imageUrl || "https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png"}
//           alt="profile"
//           className="w-32 h-32 rounded-full border-2 border-gray-300 cursor-pointer"
//           onClick={handleImageClick}
//         />
//         {/* Hidden file input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleFileChange}
//           style={{ display: "none" }}
//         />
//       </div>

//       <input
//         type="text"
//         name="firstName"
//         value={profile.firstName}
//         onChange={handleChange}
//         placeholder="First Name"
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <input
//         type="text"
//         name="middleName"
//         value={profile.middleName}
//         onChange={handleChange}
//         placeholder="Middle Name"
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <input
//         type="text"
//         name="lastName"
//         value={profile.lastName}
//         onChange={handleChange}
//         placeholder="Last Name"
//         className="mb-2 p-2 border rounded w-full"
//       />
//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//       >
//         Update Profile
//       </button>
//       {uploadMessage && <p className="mt-2 text-green-500">{uploadMessage}</p>}
//     </div>
//   );
// };

// export default MyProfile;


import React, { useEffect, useState, useRef } from "react";
import { BaseUrl } from "../../baseUrl";

const MyProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const token = localStorage.getItem("adminAuth");

  // Reference to file input for triggering click
  const fileInputRef = useRef(null);

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${BaseUrl}/admin/getProfile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const data = await response.json();
      setProfile({
        firstName: data.admin.firstName,
        middleName: data.admin.middleName,
        lastName: data.admin.lastName,
        image: data.admin.image || "https://via.placeholder.com/150",
      });
      setImageUrl(data.admin.image || "https://via.placeholder.com/150");
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Function to handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Function to handle first name change
  const handleFirstNameChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      firstName: e.target.value,
    }));
  };

  // Function to handle middle name change
  const handleMiddleNameChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      middleName: e.target.value,
    }));
  };

  // Function to handle last name change
  const handleLastNameChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      lastName: e.target.value,
    }));
  };

  // Function to handle image upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await fetch(`${BaseUrl}/admin/uploadProfilePictureAdmin`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok && data.profilePicUrl) {
        setImageUrl(data.profilePicUrl);
        setUploadMessage(data.message || "Profile picture updated successfully!");
        // Optionally update the profile data to reflect changes
        setProfile((prevProfile) => ({
          ...prevProfile,
          image: data.profilePicUrl,
        }));
      } else {
        setUploadMessage("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("An error occurred while uploading the profile picture.");
    }
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    const updatedProfile = {
      firstName: profile.firstName,
      middleName: profile.middleName,
      lastName: profile.lastName,
    };

    try {
      const response = await fetch(`${BaseUrl}/admin/addNameAdmins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || "Profile updated successfully");
        fetchProfileData(); // Refresh profile data after update
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating your profile.");
    }
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file)); // Preview selected image
    } else {
      alert("Please select a valid image file.");
    }
  };

  // Function to trigger file input click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-20">
      <h2 className="text-xl font-semibold mb-4">My Profile</h2>

      {/* Profile Image Section */}
      <div className="relative">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="profile"
          className="w-32 h-32 rounded-full border-2 border-gray-300 cursor-pointer"
          onClick={handleImageClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* First Name Input */}
      <input
        type="text"
        name="firstName"
        value={profile.firstName || ""}
        onChange={handleFirstNameChange}
        placeholder="First Name"
        className="mb-2 p-2 border rounded w-full"
      />

      {/* Middle Name Input */}
      <input
        type="text"
        name="middleName"
        value={profile.middleName || ""}
        onChange={handleMiddleNameChange}
        placeholder="Middle Name"
        className="mb-2 p-2 border rounded w-full"
      />

      {/* Last Name Input */}
      <input
        type="text"
        name="lastName"
        value={profile.lastName || ""}
        onChange={handleLastNameChange}
        placeholder="Last Name"
        className="mb-2 p-2 border rounded w-full"
      />

      {/* Update Profile Button */}
      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Update Profile
      </button>

      {/* Upload Message */}
      {uploadMessage && <p className="mt-2 text-green-500">{uploadMessage}</p>}
    </div>
  );
};

export default MyProfile;

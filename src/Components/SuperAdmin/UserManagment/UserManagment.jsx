// import React, { useEffect, useState } from "react";
// import { BaseUrl } from "../../baseUrl";

// const aUserManagement = () => {
//   const [currentUsername, setCurrentUsername] = useState("");
//   const [newUsername, setNewUsername] = useState("");
//   const [message, setMessage] = useState("");
//   const token = localStorage.getItem("token"); // Dynamically fetch token

//   const getUsernameUrl = `${BaseUrl}/admin/getUserName`;
//   const updateUsernameUrl = `${BaseUrl}/admin/updateUserName`;

//   // Fetch current username
//   const fetchUsername = async () => {
//     try {
//       const response = await fetch(getUsernameUrl, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setCurrentUsername(data.username);
//       } else {
//         setMessage(data.message || "Failed to fetch username.");
//       }
//     } catch (error) {
//       console.error("Error fetching username:", error);
//       setMessage("An error occurred while fetching the username.");
//     }
//   };

//   // Update username
//   const updateUsername = async () => {
//     if (!newUsername.trim()) {
//       setMessage("New username cannot be empty.");
//       return;
//     }

//     try {
//       const response = await fetch(updateUsernameUrl, {
//         method: "PATCH", // Updated to PATCH as per requirements
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ username: newUsername }), // Updated payload to match the field
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setMessage("Username updated successfully!");
//         setCurrentUsername(newUsername); // Update the displayed username
//       } else {
//         setMessage(data.message || "Failed to update username.");
//       }
//     } catch (error) {
//       console.error("Error updating username:", error);
//       setMessage("An error occurred while updating the username.");
//     }
//   };

//   // Fetch username on page load
//   useEffect(() => {
//     fetchUsername();
//   }, []);

//   return (
//     <div className="justify-center flex  items-center min-h-screen bg-gray-200 h-[100%] w-[80vw] ">
//       <div className="w-[90%] max-w-md bg-white shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Manage Username
//         </h2>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             Current Username:
//           </label>
//           <p className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-50">
//             {currentUsername || "Loading..."}
//           </p>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600">
//             New Username:
//           </label>
//           <input
//             type="text"
//             value={newUsername}
//             onChange={(e) => setNewUsername(e.target.value)}
//             placeholder="Enter new username"
//             className="mt-1 p-2 w-full border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>

//         <button
//           onClick={updateUsername}
//           className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
//         >
//           Update Username
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-sm text-red-500">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

// import React, { useState } from "react";
// import { BaseUrl } from "../baseUrl";
// import { useNavigate } from "react-router-dom";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
// import { FaDesktop } from "react-icons/fa"; // For computer icon

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
//   const navigate = useNavigate();

//   // Handle signup
//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const apiUrl = `${BaseUrl}/admin/signupSuperAdmin`;
//     const payload = { email, password };

//     try {
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Signup successful! Please log in.");
//         setEmail("");
//         setPassword("");
//         navigate("/OtpPage");
//       } else {
//         setMessage(data.message || "Signup failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during signup:", error);
//       setMessage("An error occurred. Please try again.");
//     }
//   };

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword((prevState) => !prevState);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg space-y-6">
//         {/* Icon and Computer Image Section */}
//         <div className="flex justify-center items-center space-x-4">
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Computer_icon_%28web%29.svg/1200px-Computer_icon_%28web%29.svg.png"
//             alt="Computer"
//             className="w-16 h-16 rounded-md border-4 border-gray-300"
//           />
//           <FaDesktop className="text-4xl text-gray-700" />
//         </div>

//         {/* Heading */}
//         <h2 className="text-2xl font-bold text-center text-gray-800">Admin Signup</h2>

//         {/* Signup Form */}
//         <form onSubmit={handleSignup} className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
//               required
//             />
//             <span
//               className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </span>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//           >
//             Signup
//           </button>
//         </form>

//         {/* Message Display */}
//         {message && <p className="mt-2 text-center text-red-500">{message}</p>}

//         {/* Link to Login Page */}
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Already registered?{" "}
//             <button
//               onClick={() => navigate("/LoginPage")}
//               className="text-blue-500 hover:underline"
//             >
//               Log in
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

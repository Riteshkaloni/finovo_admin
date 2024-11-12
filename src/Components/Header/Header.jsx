import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate("/LoginPage");
    setIsMenuOpen(false);
  };

  const handleNavigateToLogin = () => {
    navigate("/SubAdminLoginPage");
    setIsMenuOpen(false);
  };

  const handleNavigateToLogout = () => {
    navigate("/logout");
    setIsMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between mx-auto w-[100vw] p-4 bg-gray-200">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <FaHome className="text-xl" />
        <div className="flex space-x-4">
          <span className="hover:text-gray-400 cursor-pointer">Dashboard</span>
          <span className="hover:text-gray-400 cursor-pointer ml-5">Analytics</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex items-center w-1/3">
        <input
          type="search"
          placeholder="Search here"
          className="w-full p-2 rounded-lg text-gray-800 focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 relative">
        {/* Profile Icon with Hover Menu */}
        <div
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(true)}
        >
          <CgProfile className="text-2xl hover:text-gray-400 cursor-pointer" />
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 border border-gray-200 z-10">
              <ul className="flex flex-col">
                <li
                  onClick={handleNavigateToProfile}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Super Admin
                </li>
                <li
                  onClick={handleNavigateToLogin}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                 Sub Admin
                </li>
                <li
                  onClick={handleNavigateToLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Other Icons */}
        <IoIosSettings className="text-2xl hover:text-gray-400 cursor-pointer" />
        <IoMdNotifications className="text-2xl hover:text-gray-400 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;

import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const menuRef = useRef(null);

  const handleNavigateToProfile = () => {
    navigate("/MyProfile");
    setIsMenuOpen(false);
  };

  const handleNavigateToLogin = () => {
    navigate("/SubAdminProfile");
    setIsMenuOpen(false);
  };

  const handleNavigateToLogout = () => {
    localStorage.removeItem("token");
    window.open("/LoginPage");
    setIsMenuOpen(false);
  };

  const handleNavigateToDashboard = () => {
    navigate("/Dashboard");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between mx-auto w-[100vw] p-4 bg-[#07553B]">
      <div className="flex items-center space-x-4">
        <FaHome
          className="text-xl text-blue-300 hover:text-blue-400 cursor-pointer"
          onClick={handleNavigateToDashboard}
        />
      </div>

      <div className="flex items-center w-1/3">
        <input
          type="search"
          placeholder="Search here"
          className="w-full p-2 rounded-lg text-[#07553B] bg-[#CED46A] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex items-center space-x-4 relative">
        <div
          className="relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          ref={profileRef}
        >
          <CgProfile className="text-2xl text-[#CED46A] hover:text-[#CED46A] cursor-pointer" />
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-40 bg-[#CED46A] shadow-lg rounded-md py-2 border border-[#CED46A] z-10"
            >
              <ul className="flex flex-col">
                <li
                  onClick={handleNavigateToProfile}
                  className="px-4 py-2 text-a hover:bg-blue-200 cursor-pointer"
                >
                  Super Admin
                </li>
                <li
                  onClick={handleNavigateToLogin}
                  className="px-4 py-2 text-blue-800 hover:bg-blue-200 cursor-pointer"
                >
                  Sub Admin
                </li>
                <li
                  onClick={handleNavigateToLogout}
                  className="px-4 py-2 text-blue-800 hover:bg-blue-200 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Other Icons */}
        <IoIosSettings className="text-2xl text-blue-300 hover:text-blue-400 cursor-pointer" />
        <IoMdNotifications className="text-2xl text-blue-300 hover:text-blue-400 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;

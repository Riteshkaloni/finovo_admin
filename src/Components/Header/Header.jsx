import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";


const Header = () => {
  return (

    <header className="flex items-center justify-between mx-auto  w-[80vw] p-4 bg-gray-200">
      <div className="flex items-center space-x-4">
        <FaHome className="text-xl" />
        <div className="flex space-x-4">
          <span className="hover:text-gray-400 cursor-pointer">Dashboard</span>
          <span className="hover:text-gray-400 cursor-pointer ml-5">Analytics</span>
        </div>
      </div>
      <div className="flex items-center w-1/3">
        <input
          type="search"
          placeholder="Search here"
          className="w-full p-2 rounded-lg text-gray-800 focus:outline-none"
        />
      </div>

      <div className="flex items-center space-x-4">
        <CgProfile className="text-2xl hover:text-gray-400 b cursor-pointer" />
        <IoIosSettings className="text-2xl hover:text-gray-400 cursor-pointer" />
        <IoMdNotifications className="text-2xl hover:text-gray-400 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;

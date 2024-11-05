import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdSettingsApplications } from "react-icons/md";
import { PiImageSquareLight } from "react-icons/pi";
import { MdOutlineContentPaste } from "react-icons/md";
import { BiCustomize } from "react-icons/bi";
import { RiShoppingBasketLine } from "react-icons/ri";
import { MdOutlineUpcoming } from "react-icons/md";
import { MdOutlineViewArray } from "react-icons/md";
import { MdOutlineReceiptLong } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";


const Navbar = () => {
  return (
    <>

    <div className="w-[270px] rounded-s-lg   ">

      <aside className=" ">
        <div className="px-3 py-4 h-[100vh] bg-slate-700 ml-2 rounded-xl  scroll-mx-0  overflow-scroll ">
          <div className="flex justify-center p-2 text-white  ">
            <div className="flex justify-start p-1 ">
              <MdDashboard />
            </div>
            Materail Dashboard Pro
          </div>

          <hr className="border-t border-gray-200 my-2" />

          <button className=" text-white text- bg-center px-16">ALICE</button>
          <hr className="border-t border-gray-300 my-2" />

          <div className="flex flex-col  h-full">
            <ul className="space-y-2 font-medium ">
              <div className="flex  p-2 text-white  bg-slate-400 border-2 rounded-xl ">
                <div className="flex justify-start p-1 ">
                  <BiCustomize />
                </div>
                Dashboard
              </div>
              <li>
                <span className="ms-3 whitespace-nowrap text-white text-bold">
                  Pages
                </span>
              </li>
              <div className="flex justify-between  p-2 text-white  hover:bg-slate-400  hover:rounded-xl  items-center">
                <div className="flex items-center p-1">
                  <PiImageSquareLight />
                  <p> Pages</p>
                </div>
                <div className="">
                  <MdKeyboardArrowDown />
                </div>
              </div>

              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl  ">
                <div className="flex justify-start p-1 ">
                  <MdSettingsApplications />
                </div>
                Application
              </div>

              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl  ">
                <div className="flex justify-start p-1 ">
                  <RiShoppingBasketLine />
                </div>
                Ecommerce
              </div>
              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl  ">
                <div className="flex justify-start p-1 ">
                  <MdOutlineContentPaste />
                </div>
                Authentication
              </div>
              <hr className="border-t border-gray-300  hover:bg-slate-400  hover:rounded-xl  " />
              <span className="ml-2 whitespace-nowrap text-white text-bold mt-8 ">
                DOCS
              </span>
              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl   ">
                <div className="flex justify-start p-1 ">
                  <MdOutlineUpcoming />
                </div>
                Basic
              </div>
              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl   ">
                <div className="flex justify-start p-1 ">
                  <MdOutlineViewArray />
                </div>
                Component
              </div>
              <div className="flex  p-2 text-white hover:bg-slate-400  hover:rounded-xl dropdown  ">
                <div className="flex justify-start p-1 ">
                  <MdOutlineReceiptLong />
                </div>
                Change Log
              </div>



            </ul>
          </div>
        </div>
      </aside>
    </div>
    </>
  );
};
export default Navbar;

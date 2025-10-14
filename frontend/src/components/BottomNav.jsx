import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const BottomNav = () => (
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 z-50 rounded-tl-2xl rounded-tr-2xl">
    <div className="flex justify-around items-center h-16">
      <NavLink to="/">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-y-1 ${
              isActive ? "text-white" : "text-gray-400"
            }`}
          >
            {isActive ? <AiFillHome size={26} /> : <AiOutlineHome size={26} />}
            <span className="text-xs font-medium">Home</span>
          </div>
        )}
      </NavLink>

      <NavLink to="/saved">
        {({ isActive }) => (
          <div
            className={`flex flex-col items-center gap-y-1 ${
              isActive ? "text-white" : "text-gray-400"
            }`}
          >
            {isActive ? <BsBookmarkFill size={22} /> : <BsBookmark size={22} />}
            <span className="text-xs font-medium">Saved</span>
          </div>
        )}
      </NavLink>
    </div>
  </div>
);

export default BottomNav;

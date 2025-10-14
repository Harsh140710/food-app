import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsBookmarkFill } from "react-icons/bs";

const BottomNav = () => {
  const activeLink = "text-white";
  const normalLink = "text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-orange-400 border-t border-gray-800 z-50 rounded-tl-2xl rounded-tr-2xl">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex flex-col items-center">
            <AiFillHome size={28} />
            <span className="text-xs">Home</span>
          </div>
        </NavLink>
        <NavLink
          to="/saved"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          <div className="flex flex-col items-center">
            <BsBookmarkFill size={24} />
            <span className="text-xs">Saved</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;
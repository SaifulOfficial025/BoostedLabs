import React from "react";
import { IoPersonOutline } from "react-icons/io5";

function Header() {
  return (
    <div
      className="w-full flex items-center justify-between px-8 py-4 absolute top-0 left-0 z-20 mt-12 font-sans"
      style={{ background: "transparent", minHeight: "56px" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/public/BoostedLabLogo.svg"
          alt="Logo"
          className="w-20 h-w-20 object-contain"
        />
      </div>
      {/* Navigation */}
      <nav className="flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
        <a
          href="#"
          className="font-bold text-black border-b-2 border-black pb-1"
        >
          Home
        </a>
        <a href="#" className="text-black">
          Shop
        </a>
        <a href="#" className="text-black">
          Contact Us
        </a>
        <a href="#" className="text-black">
          About Us
        </a>
      </nav>
      {/* Search, Cart, Account */}
      <div className="flex items-center gap-4 ml-auto ">
        {/* Search Bar */}
        <div
          className="flex items-center bg-white rounded-full px-5 py-2 shadow-md"
          style={{ background: "transparent", minWidth: "220px" }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-black text-md "
          />
          {/* <svg
            width="18"
            height="18"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="ml-2"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
          </svg> */}
        </div>
        {/* Cart Icon */}
        <button className="bg-transparent p-2 rounded hover:bg-gray-100">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#222"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
        {/* My Account Button */}
        <button className="flex items-center bg-black text-white px-3 py-3 rounded text-xs font-medium gap-2">
          <IoPersonOutline className="w-5 h-5" />
          My Account
        </button>
      </div>
    </div>
  );
}

export default Header;

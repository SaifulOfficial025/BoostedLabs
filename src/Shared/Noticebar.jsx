import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Noticebar() {
  return (
    <div
      className="w-full bg-black flex items-center justify-between px-8 py-1 text-white text-md font-normal px-32 py-3 fixed top-0 left-0 z-40"
      style={{ minHeight: "32px" }}
    >
      <div className="flex items-center gap-2">
        <span>Follow Us On:</span>
        <a href="#" className="hover:text-gray-400" aria-label="Twitter">
          <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
            <FaXTwitter className="text-black text-[15px]" />
          </span>
        </a>
        <a href="#" className="hover:text-gray-400" aria-label="Facebook">
          <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
            <FaFacebookF className="text-black text-[15px]" />
          </span>
        </a>
        <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
          <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
            <FaLinkedinIn className="text-black text-[15px]" />
          </span>
        </a>
        <a href="#" className="hover:text-gray-400" aria-label="Instagram">
          <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
            <FaInstagram className="text-black text-[15px]" />
          </span>
        </a>
      </div>
      <div className="flex-1 flex justify-end ">
        <span className="text-white">
          Free Shipping Worldwide When Order Above $1000
        </span>
      </div>
    </div>
  );
}

export default Noticebar;

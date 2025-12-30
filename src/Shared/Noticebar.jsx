import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Noticebar() {
  return (
    <div
      className="w-full bg-black flex items-center justify-between px-2 sm:px-4 md:px-8 lg:px-32 py-1.5 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-md font-normal fixed top-0 left-0 z-40"
      style={{ minHeight: "32px" }}
    >
      <section className="max-w-[1536px] mx-auto flex items-center w-full relative">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:inline">Follow Us On:</span>
          <span className="sm:hidden text-xs">Follow:</span>
          <a href="#" className="hover:text-gray-400" aria-label="Twitter">
            <span className="bg-white rounded-full flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              <FaXTwitter className="text-black text-[10px] sm:text-[12px] md:text-[15px]" />
            </span>
          </a>
          <a href="#" className="hover:text-gray-400" aria-label="Facebook">
            <span className="bg-white rounded-full flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              <FaFacebookF className="text-black text-[10px] sm:text-[12px] md:text-[15px]" />
            </span>
          </a>
          <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
            <span className="bg-white rounded-full flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              <FaLinkedinIn className="text-black text-[10px] sm:text-[12px] md:text-[15px]" />
            </span>
          </a>
          <a href="#" className="hover:text-gray-400" aria-label="Instagram">
            <span className="bg-white rounded-full flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
              <FaInstagram className="text-black text-[10px] sm:text-[12px] md:text-[15px]" />
            </span>
          </a>
        </div>
        <div className="flex-1 flex justify-end px-1 sm:px-2">
          <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base text-right">
            {/* FREE Shipping in Australia When Order Above $200 */}
            {/* & Get a FREE
            T-shirt with any order over $1500. */}
          </span>
        </div>
      </section>
    </div>
  );
}

export default Noticebar;

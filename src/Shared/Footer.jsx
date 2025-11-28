import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import visa from "../../public/visa.png";
import master from "../../public/master.png";
import amex from "../../public/amex.png";

function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-10 pb-4 px-4 sm:px-6 md:px-32 ">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start mb-8 gap-8 text-center sm:text-left">
        {/* Stay Connected */}
        <div className="flex flex-col gap-2 min-w-[180px] items-center sm:items-start">
          <span className="font-semibold text-xl mb-5">Stay Connected</span>
          <span className="font-semibold text-[#cbd5e1]">BOOSTED LABS</span>
          <span className="text-md text-[#cbd5e1]">
            contact@boostedlabs.com
          </span>
          <span className="text-md text-[#cbd5e1]">012345678902</span>
          <span className="mt-5 mb-1">Join Us</span>
          <div className="flex gap-3 mt-1">
            {/* Social Icons */}
            <a href="#" aria-label="Twitter">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaXTwitter className="text-black text-[15px]" />
              </span>
            </a>
            <a href="#" aria-label="Facebook">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaFacebookF className="text-black text-[15px]" />
              </span>
            </a>
            <a href="#" aria-label="LinkedIn">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaLinkedinIn className="text-black text-[15px]" />
              </span>
            </a>
            <a href="#" aria-label="Instagram">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaInstagram className="text-black text-[15px]" />
              </span>
            </a>
          </div>
        </div>
        {/* Account */}
        <div className="flex flex-col gap-2 min-w-[120px] items-center sm:items-start">
          <span className="font-bold text-xl mb-2">Menu</span>
          <Link to="/" className="text-md text-[#cbd5e1] mt-2">
            Home
          </Link>
          <Link to="/shop" className="text-md text-[#cbd5e1] mt-2">
            Shop
          </Link>
          <Link to="/merchandise" className="text-md text-[#cbd5e1] mt-2">
            Merchandise
          </Link>
          <Link to="/contact-us" className="text-md text-[#cbd5e1] mt-2">
            Contact Us
          </Link>
          <Link to="/about" className="text-md text-[#cbd5e1] mt-2">
            About Us
          </Link>
        </div>
        {/* Help Center */}
        <div className="flex flex-col gap-2 min-w-[120px] items-center sm:items-start">
          <span className="font-bold text-xl mb-2">Help Center</span>
          <a href="#" className="text-md text-[#cbd5e1] mt-2">
            Payment
          </a>
          <a href="#" className="text-md text-[#cbd5e1] mt-2">
            Refund
          </a>
          <a href="#" className="text-md text-[#cbd5e1] mt-2">
            Exchange
          </a>
        </div>
      </div>
      <hr className="border-t border-gray-600 mb-4" />
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-center sm:text-left">
        <span className="text-sm sm:text-md text-[#cbd5e1]">
          Copyright @ 2025. All rights reserved.
        </span>
        <div className="flex justify-center sm:justify-start gap-2">
          {/* Payment Logos - use placeholder images */}
          <img
            src={visa}
            alt="Visa"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
          <img
            src={master}
            alt="Mastercard"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
          <img
            src={amex}
            alt="Amex"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

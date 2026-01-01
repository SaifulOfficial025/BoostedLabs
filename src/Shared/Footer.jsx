import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import visa from "../../public/visa.png";
import master from "../../public/master.png";
import amex from "../../public/amex.png";
import { IoLogoWhatsapp } from "react-icons/io";
function Footer() {
  const location = useLocation();

  function handleNavClick(e, path) {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 1900, behavior: "smooth" });
    }
  }
  return (
    <footer className="w-full bg-black text-white pt-10 pb-4 px-4 sm:px-6 md:px-32 ">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start mb-8 gap-8 text-center sm:text-left">
        {/* Stay Connected */}
        <div className="flex flex-col gap-2 min-w-[180px] items-center sm:items-start">
          <span className="font-semibold text-xl mb-5">Stay Connected</span>
          <span className="font-semibold text-[#cbd5e1]">BOOSTED LABS</span>
          <span className="text-md text-[#cbd5e1]">
            Boostedlabs@hotmail.com
          </span>
          <span className="text-md text-[#cbd5e1]">+61 478 101 857</span>
          <span className="mt-5 mb-1">Join Us</span>
          <div className="flex gap-3 mt-1">
            {/* Social Icons */}

            <a href="#" aria-label="Facebook">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaFacebookF className="text-black text-[15px]" />
              </span>
            </a>
            <a href="https://wa.me/61478101857" aria-label="WhatsApp">
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <IoLogoWhatsapp className="text-black text-[18px]" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/boostedlab"
              aria-label="Instagram"
            >
              <span className="bg-white rounded-full flex items-center justify-center w-7 h-7">
                <FaInstagram className="text-black text-[15px]" />
              </span>
            </a>
          </div>
        </div>
        {/* Account */}
        <div className="flex flex-col gap-2 min-w-[120px] items-center sm:items-start">
          <span className="font-bold text-xl mb-2">Menu</span>
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="text-md text-[#cbd5e1] mt-2 "
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={(e) => handleNavClick(e, "/shop")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Shop
          </Link>
          <Link
            to="/merchandise"
            onClick={(e) => handleNavClick(e, "/merchandise")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Merchandise
          </Link>
          <Link
            to="/usage-guide"
            onClick={(e) => handleNavClick(e, "/usage-guide")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Usage Guide
          </Link>
          <Link
            to="/reconstitute"
            onClick={(e) => handleNavClick(e, "/reconstitute")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Reconstitute
          </Link>

          <Link
            to="/about"
            onClick={(e) => handleNavClick(e, "/about")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            About Us
          </Link>
        </div>
        {/* Help Center */}
        <div className="flex flex-col gap-2 min-w-[120px] items-center sm:items-start">
          <span className="font-bold text-xl mb-2">Help Center</span>
          <Link
            to="/about"
            onClick={(e) => handleNavClick(e, "/about")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Payment
          </Link>
          <Link
            to="/about"
            onClick={(e) => handleNavClick(e, "/about")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Refund
          </Link>
          <Link
            to="/about"
            onClick={(e) => handleNavClick(e, "/about")}
            className="text-md text-[#cbd5e1] mt-2"
          >
            Exchange
          </Link>
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
            loading="lazy"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
          <img
            src={master}
            alt="Mastercard"
            loading="lazy"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
          <img
            src={amex}
            alt="Amex"
            loading="lazy"
            className="h-8 sm:h-12 bg-white px-1 py-0.5 rounded-md"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

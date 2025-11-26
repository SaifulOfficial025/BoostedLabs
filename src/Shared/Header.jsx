import React, { useState, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/BoostedLabLogo.svg";
import filtericon from "../../public/filter.png";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const filterRef = useRef(null);
  const location = useLocation();
  const pathname = location?.pathname || "";

  const isHome = pathname === "/";
  const isShop = pathname === "/shop" || pathname.startsWith("/shop/");
  const isContact = pathname === "/contact-us";
  const isAbout = pathname === "/about";

  const handleFilterClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full flex items-center justify-between px-16 py-4 left-0 z-30 font-sans sticky top-[48px] bg-black/35"
      style={{ backdropFilter: "blur(10px)", minHeight: "56px" }}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-15 h-15 object-contain"
            style={{
              filter: "drop-shadow(0 0 2px white) drop-shadow(0 0 6px white)",
            }}
          />
        </Link>
      </div>
      {/* Navigation */}
      <nav className="flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
        <Link
          to="/"
          className={`text-white ${
            isHome ? "font-bold border-b-2 border-white pb-1" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={`text-white ${
            isShop ? "font-bold border-b-2 border-white pb-1" : ""
          }`}
        >
          Shop
        </Link>
        <Link
          to="/contact-us"
          className={`text-white ${
            isContact ? "font-bold border-b-2 border-white pb-1" : ""
          }`}
        >
          Contact Us
        </Link>
        <Link
          to="/about"
          className={`text-white ${
            isAbout ? "font-bold border-b-2 border-white pb-1" : ""
          }`}
        >
          About Us
        </Link>
      </nav>
      {/* Search, Cart, Account */}
      <div className="flex items-center gap-4 ml-auto ">
        {/* Search Bar */}
        <div
          className="flex items-center bg-white rounded-full px-5 py-2 shadow-md relative border border-white"
          style={{ background: "transparent", minWidth: "220px" }}
          ref={filterRef}
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
            className="bg-transparent outline-none text-white text-md  placeholder-white flex-1"
          />
          <img
            src={filtericon}
            alt="Filter"
            className="w-5 cursor-pointer"
            onClick={handleFilterClick}
          />
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-[#f6fafd] border border-gray-400 rounded-xl shadow-lg w-46 py-4 px-6 z-50 flex flex-col gap-4">
              <Link
                to="/shop/filtered-products/weight-loss"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Weight loss</span>
              </Link>
              <Link
                to="/shop/filtered-products/cosmetic"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Cosmetic</span>
              </Link>
              <Link
                to="/shop/filtered-products/performance"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Performance</span>
              </Link>
              <Link
                to="/shop/filtered-products/energy"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Energy</span>
              </Link>
              <Link
                to="/shop/filtered-products/metabolic"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Metabolic</span>
              </Link>
              <Link
                to="/shop/filtered-products/healing"
                className="hover:bg-gray-200 rounded px-2 transition-colors "
              >
                <span className="text-xl text-[#64748b]">Healing</span>
              </Link>
            </div>
          )}
        </div>
        {/* Cart Icon */}
        <button
          className="bg-transparent p-2 rounded hover:bg-gray-100 hover:shadow-sm active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          onClick={handleCartClick}
          aria-label="Open shopping cart"
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
        <ShoppingCartModal
          open={showCartModal}
          onClose={() => setShowCartModal(false)}
        />
        {/* My Account Button */}
        <Link to="/signin">
          <button className="flex items-center bg-white text-black px-3 py-3 rounded-lg text-xs font-medium gap-2">
            <IoPersonOutline className="w-5 h-5" />
            My Account
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;

import React, { useState, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../public/BoostedLabLogo.svg";
import filtericon from "../../public/filter.png";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const filterRef = useRef(null);
  const mobileFilterRef = useRef(null);
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
      // If click is inside desktop filter OR inside mobile filter, do nothing
      const clickedInsideDesktop =
        filterRef.current && filterRef.current.contains(event.target);
      const clickedInsideMobile =
        mobileFilterRef.current &&
        mobileFilterRef.current.contains(event.target);
      if (clickedInsideDesktop || clickedInsideMobile) return;
      setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="w-full flex items-center justify-between px-2 sm:px-4 md:px-16 py-2 md:py-4 left-0 z-30 font-sans sticky top-[32px] sm:top-[40px] md:top-[48px] bg-black/35"
        style={{ backdropFilter: "blur(10px)", minHeight: "56px" }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 object-contain"
              style={{
                filter: "drop-shadow(0 0 2px white) drop-shadow(0 0 6px white)",
              }}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          aria-label="Toggle menu"
        >
          {showMobileMenu ? (
            <IoClose className="w-6 h-6" />
          ) : (
            <HiMenuAlt3 className="w-6 h-6" />
          )}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
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
        {/* Search, Cart, Account - Desktop */}
        <div className="hidden lg:flex items-center gap-1 sm:gap-2 md:gap-4 ml-auto">
          {/* Search Bar */}
          <div
            className="flex items-center bg-white rounded-full px-3 md:px-5 py-1.5 md:py-2 shadow-md relative border border-white"
            style={{ background: "transparent", minWidth: "150px" }}
            ref={filterRef}
          >
            <svg
              width="16"
              height="16"
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
              className="bg-transparent outline-none text-white text-sm md:text-md placeholder-white flex-1"
            />
            <img
              src={filtericon}
              alt="Filter"
              className="w-4 md:w-5 cursor-pointer"
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
            className="bg-transparent p-1.5 md:p-2 rounded hover:bg-gray-100 hover:shadow-sm active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            onClick={handleCartClick}
            aria-label="Open shopping cart"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="md:w-[22px] md:h-[22px]"
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
            <button className="flex items-center bg-white text-black px-2 py-2 sm:px-3 sm:py-3 md:px-3 md:py-3 rounded-lg text-xs font-medium gap-1 sm:gap-2">
              <IoPersonOutline className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">My Account</span>
            </button>
          </Link>
        </div>

        {/* Cart Icon - Mobile Only */}
        <button
          className="lg:hidden text-white p-2 absolute right-12"
          onClick={handleCartClick}
          aria-label="Open shopping cart"
        >
          <svg
            width="20"
            height="20"
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
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed top-[88px] sm:top-[96px] left-0 right-0 bg-black/95 backdrop-blur-lg z-40 border-t border-gray-700">
          <nav className="flex flex-col p-4">
            <Link
              to="/"
              className={`text-white py-3 px-4 rounded ${
                isHome ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-white py-3 px-4 rounded ${
                isShop ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Shop
            </Link>
            <Link
              to="/contact-us"
              className={`text-white py-3 px-4 rounded ${
                isContact ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className={`text-white py-3 px-4 rounded ${
                isAbout ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              About Us
            </Link>

            {/* Search Bar - Mobile */}
            <div className="mt-4 mb-2">
              <div className="flex items-center bg-transparent rounded-full px-4 py-2 border border-white">
                <svg
                  width="16"
                  height="16"
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
                  className="bg-transparent outline-none text-white text-sm placeholder-white flex-1"
                />
                <img
                  src={filtericon}
                  alt="Filter"
                  className="w-4 cursor-pointer"
                  onClick={handleFilterClick}
                />
              </div>
              {showDropdown && (
                <div
                  ref={mobileFilterRef}
                  className="mt-2 bg-[#f6fafd] border border-gray-400 rounded-xl shadow-lg py-4 px-6 flex flex-col gap-4 z-50"
                >
                  <Link
                    to="/shop/filtered-products/weight-loss"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Weight loss</span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/cosmetic"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Cosmetic</span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/performance"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Performance</span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/energy"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Energy</span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/metabolic"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Metabolic</span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/healing"
                    className="hover:bg-gray-200 rounded px-2 transition-colors"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowDropdown(false);
                    }}
                  >
                    <span className="text-lg text-[#64748b]">Healing</span>
                  </Link>
                </div>
              )}
            </div>

            {/* My Account Button - Mobile */}
            <Link to="/signin" onClick={() => setShowMobileMenu(false)}>
              <button className="w-full flex items-center justify-center bg-white text-black px-4 py-3 rounded-lg text-sm font-medium gap-2 mt-2">
                <IoPersonOutline className="w-5 h-5" />
                My Account
              </button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;

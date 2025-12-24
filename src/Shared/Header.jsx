import React, { useState, useRef, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import ShoppingCartModal from "./ShoppingCartModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Auth";
import Logo from "../../public/BoostedLabLogo.svg";
import filtericon from "../../public/filter.png";
import { LuShoppingCart } from "react-icons/lu";
import ChangePasswordModal from "../Pages/Profile/ChangePasswordModal";
import RecurringProductModal from "../Pages/Profile/RecurringProductModal";
import { BASE_URL } from "../Redux/baseUrl";

import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Header() {
  const [showFilter, setShowFilter] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const filterRef = useRef(null);
  const accountRef = useRef(null);
  const mobileFilterRef = useRef(null);
  const location = useLocation();
  const pathname = location?.pathname || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showRecurring, setShowRecurring] = useState(false);

  const [storedAuth, setStoredAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth")) || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    function onStorage() {
      try {
        setStoredAuth(JSON.parse(localStorage.getItem("auth")) || null);
      } catch (e) {
        setStoredAuth(null);
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Resolve user image URL (prepend BASE_URL if path is relative)
  const userImageSrc = (() => {
    try {
      // Check regular login (data object) first, then social login (user object)
      const img =
        (storedAuth && storedAuth.data && storedAuth.data.image) ||
        (storedAuth && storedAuth.user && storedAuth.user.image);
      if (!img) return null;
      return img.startsWith("http") ? img : `${BASE_URL}${img}`;
    } catch (e) {
      return null;
    }
  })();

  const isHome = pathname === "/";
  const isShop = pathname === "/shop" || pathname.startsWith("/shop/");
  const isMerchandise =
    pathname === "/merchandise" || pathname.startsWith("/merchandise/");
  const isContact = pathname === "/contact-us";
  const isAbout = pathname === "/about";
  const isUsageGuide = pathname === "/usage-guide";
  const isReconstitute = pathname === "/reconstitute";

  const handleFilterClick = () => {
    setShowFilter((prev) => !prev);
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      const clickedInsideFilter =
        filterRef.current && filterRef.current.contains(event.target);
      const clickedInsideMobileFilter =
        mobileFilterRef.current &&
        mobileFilterRef.current.contains(event.target);
      const clickedInsideAccount =
        accountRef.current && accountRef.current.contains(event.target);

      if (!clickedInsideFilter && !clickedInsideMobileFilter) {
        setShowFilter(false);
      }
      if (!clickedInsideAccount) {
        setShowAccount(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="w-full bg-black flex items-center justify-between px-2 sm:px-4 md:px-8 lg:px-32 py-1.5 sm:py-2 md:py-3 text-white text-xs sm:text-sm md:text-md font-normal fixed top-0 left-0 z-40"
        style={{ minHeight: "32px" }}
      >
        <section className="max-w-[1536px] mx-auto flex items-center w-full relative">
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <span className="hidden sm:inline text-[10px] sm:text-xs md:text-sm">
              Follow Us On:
            </span>
            <span className="sm:hidden text-[9px]">Follow:</span>
            <a
              href="#"
              className="hover:text-gray-400 transition-all"
              aria-label="Twitter"
            >
              <span className="bg-white rounded-full flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <FaXTwitter className="text-black text-[8px] sm:text-[12px] md:text-[15px]" />
              </span>
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all"
              aria-label="Facebook"
            >
              <span className="bg-white rounded-full flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <FaFacebookF className="text-black text-[8px] sm:text-[12px] md:text-[15px]" />
              </span>
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all"
              aria-label="LinkedIn"
            >
              <span className="bg-white rounded-full flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <FaLinkedinIn className="text-black text-[8px] sm:text-[12px] md:text-[15px]" />
              </span>
            </a>
            <a
              href="#"
              className="hover:text-gray-400 transition-all"
              aria-label="Instagram"
            >
              <span className="bg-white rounded-full flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7">
                <FaInstagram className="text-black text-[8px] sm:text-[12px] md:text-[15px]" />
              </span>
            </a>
          </div>
          <div className="flex-1 flex justify-end px-1 sm:px-2 min-w-0 overflow-hidden">
            <span className="text-white text-[8px] sm:text-xs md:text-sm lg:text-base text-right truncate">
              FREE Shipping in Australia When Order Above $200
              {/* & Get a FREE
                T-shirt with any order over $1500. */}
            </span>
          </div>
        </section>
      </div>
      <div
        className="w-full flex items-center justify-between px-2 sm:px-4 md:px-16 py-2 md:py-4 left-0 z-50 font-sans sticky top-[32px] sm:top-[44px] md:top-[48px] bg-black/35 "
        style={{ backdropFilter: "blur(10px)", minHeight: "56px" }}
      >
        <section className="max-w-[1536px] mx-auto flex items-center w-full relative">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 object-contain"
                style={{
                  filter:
                    "drop-shadow(0 0 2px white) drop-shadow(0 0 6px white)",
                }}
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden text-white p-2 ml-2 touch-manipulation active:scale-95 transition-transform"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <IoClose className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <HiMenuAlt3 className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>

          {/* Navigation - Desktop */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
            <Link
              to="/"
              className={`text-white text-sm 2xl:text-base ${
                isHome ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-white text-sm 2xl:text-base ${
                isShop ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              Shop
            </Link>

            <Link
              to="/merchandise"
              className={`text-white text-sm 2xl:text-base ${
                isMerchandise ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              Merchandise
            </Link>

            <Link
              to="/usage-guide"
              className={`text-white text-sm 2xl:text-base ${
                isUsageGuide ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              Usage Guide
            </Link>

            <Link
              to="/reconstitute"
              className={`text-white text-sm 2xl:text-base ${
                isReconstitute ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              Reconstitute
            </Link>

            <Link
              to="/about"
              className={`text-white text-sm 2xl:text-base ${
                isAbout ? "font-bold border-b-2 border-white pb-1" : ""
              }`}
            >
              About Us
            </Link>
          </nav>
          {/* Search, Cart, Account - Desktop */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-4 ml-auto">
            {/* Search Bar */}
            <div
              className="flex items-center bg-white rounded-full px-3 2xl:px-5 py-1.5 2xl:py-2 shadow-md relative border border-white"
              style={{
                background: "transparent",
                minWidth: "120px",
                maxWidth: "200px",
              }}
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
                className="bg-transparent outline-none text-white text-xs 2xl:text-sm placeholder-white flex-1"
              />
              <img
                src={filtericon}
                alt="Filter"
                className="w-4 md:w-5 cursor-pointer"
                onClick={handleFilterClick}
              />
              {showFilter && (
                <div className="absolute top-12 right-0 z-50 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/shop/filtered-products/weight-loss"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Weight loss
                      </span>
                    </Link>

                    <Link
                      to="/shop/filtered-products/cosmetic"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Cosmetic
                      </span>
                    </Link>

                    <Link
                      to="/shop/filtered-products/performance"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Performance
                      </span>
                    </Link>

                    <Link
                      to="/shop/filtered-products/energy"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Energy
                      </span>
                    </Link>

                    <Link
                      to="/shop/filtered-products/metabolic"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Metabolic
                      </span>
                    </Link>

                    <Link
                      to="/shop/filtered-products/healing"
                      className="flex items-center px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        Boosted Healing
                      </span>
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 px-3 py-2 bg-gray-200 text-xs text-gray-500">
                    Quick filters to narrow products
                  </div>
                </div>
              )}
            </div>
            {/* Cart Icon */}
            <button
              className="group bg-transparent p-1.5 md:p-2 rounded hover:bg-gray-100 hover:shadow-sm active:scale-95 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
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
                className="w-5 h-5 md:w-[22px] md:h-[22px] block group-hover:hidden"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <LuShoppingCart className="w-5 h-5 md:w-[22px] md:h-[22px] text-black hidden group-hover:block" />
            </button>
            <ShoppingCartModal
              open={showCartModal}
              onClose={() => setShowCartModal(false)}
            />
            {/* Account - show profile if logged in */}
            {storedAuth && (storedAuth.data || storedAuth.user) ? (
              <div className="relative" ref={accountRef}>
                <button
                  onClick={() => setShowAccount((s) => !s)}
                  className="flex items-center bg-white text-black px-2 py-2 sm:px-3 sm:py-3 md:px-3 md:py-3 rounded-lg text-xs font-medium gap-2"
                >
                  {userImageSrc ? (
                    <img
                      src={userImageSrc}
                      alt="avatar"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <IoPersonOutline className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">
                    {storedAuth.data?.first_name ||
                      storedAuth.user?.first_name ||
                      storedAuth.data?.email ||
                      storedAuth.user?.email}
                  </span>
                </button>
                {showAccount && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowAccount(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowAccount(false);
                        setShowChangePassword(true);
                      }}
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setShowAccount(false);
                        setShowRecurring(true);
                      }}
                    >
                      Recurring Product List
                    </button>
                    <Link
                      to="/order-history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowAccount(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => {
                        try {
                          dispatch(logout());
                        } catch (e) {}
                        setShowAccount(false);
                        setStoredAuth(null);
                        navigate("/signin");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin">
                <button className="flex items-center bg-white text-black px-2 py-2 sm:px-3 sm:py-3 md:px-3 md:py-3 rounded-lg text-xs font-medium gap-1 sm:gap-2">
                  <IoPersonOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">My Account</span>
                </button>
              </Link>
            )}
          </div>

          {/* Cart Icon - Mobile Only */}
          <button
            className="xl:hidden text-white p-2 ml-auto mr-2 touch-manipulation active:scale-95 transition-transform"
            onClick={handleCartClick}
            aria-label="Open shopping cart"
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="sm:w-5 sm:h-5"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </section>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="xl:hidden fixed top-[88px] sm:top-[96px] left-0 right-0 bg-black/95 backdrop-blur-lg z-40 border-t border-gray-700 max-h-[calc(100vh-88px)] sm:max-h-[calc(100vh-96px)] overflow-y-auto">
          <nav className="flex flex-col p-3 sm:p-4">
            <Link
              to="/"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isHome ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isShop ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Shop
            </Link>
            <Link
              to="/merchandise"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isMerchandise ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Merchandise
            </Link>

            <Link
              to="/usage-guide"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isUsageGuide ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Usage Guide
            </Link>

            <Link
              to="/reconstitute"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isReconstitute ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Reconstitute
            </Link>

            <Link
              to="/about"
              className={`text-white py-2.5 px-3 sm:py-3 sm:px-4 rounded text-sm sm:text-base touch-manipulation ${
                isAbout ? "font-bold bg-white/10" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              About Us
            </Link>

            {/* Search Bar - Mobile */}
            <div className="mt-3 mb-2 sm:mt-4">
              <div className="flex items-center bg-transparent rounded-full px-3 py-2 sm:px-4 border border-white">
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="mr-2 flex-shrink-0 sm:w-4 sm:h-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-white text-xs sm:text-sm placeholder-white flex-1 min-w-0"
                />
                <img
                  src={filtericon}
                  alt="Filter"
                  className="w-3.5 sm:w-4 cursor-pointer flex-shrink-0 touch-manipulation"
                  onClick={handleFilterClick}
                />
              </div>
              {showFilter && (
                <div
                  ref={mobileFilterRef}
                  className="mt-2 bg-[#f6fafd] border border-gray-400 rounded-xl shadow-lg py-3 px-4 sm:py-4 sm:px-6 flex flex-col gap-3 sm:gap-4 z-50"
                >
                  <Link
                    to="/shop/filtered-products/weight-loss"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Weight loss
                    </span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/cosmetic"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Cosmetic
                    </span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/performance"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Performance
                    </span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/energy"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Energy
                    </span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/metabolic"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Metabolic
                    </span>
                  </Link>
                  <Link
                    to="/shop/filtered-products/healing"
                    className="hover:bg-gray-200 rounded px-2 py-1 transition-colors touch-manipulation"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowFilter(false);
                    }}
                  >
                    <span className="text-sm sm:text-lg text-[#64748b]">
                      Boosted Healing
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* My Account - Mobile */}
            {storedAuth && (storedAuth.data || storedAuth.user) ? (
              <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-t border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3">
                  {userImageSrc ? (
                    <img
                      src={userImageSrc}
                      alt="avatar"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <IoPersonOutline className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium text-sm sm:text-base truncate">
                      {storedAuth.data?.first_name ||
                        storedAuth.user?.first_name ||
                        storedAuth.data?.email ||
                        storedAuth.user?.email}
                    </div>
                    <div className="text-gray-300 text-xs sm:text-sm truncate">
                      View and manage your account
                    </div>
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 flex flex-col gap-1.5 sm:gap-2">
                  <Link
                    to="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-white py-1.5 px-2 rounded hover:bg-white/10 transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    View Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowChangePassword(true);
                    }}
                    className="text-white text-left py-1.5 px-2 rounded hover:bg-white/10 transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileMenu(false);
                      setShowRecurring(true);
                    }}
                    className="text-white text-left py-1.5 px-2 rounded hover:bg-white/10 transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    Recurring Product List
                  </button>
                  <Link
                    to="/order-history"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-white py-1.5 px-2 rounded hover:bg-white/10 transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    Order History
                  </Link>
                  <button
                    onClick={() => {
                      try {
                        dispatch(logout());
                      } catch (e) {}
                      try {
                        localStorage.removeItem("auth");
                        localStorage.removeItem("auth_verify");
                        localStorage.removeItem("otpEmail");
                      } catch (e) {}
                      setShowMobileMenu(false);
                      setStoredAuth(null);
                      navigate("/signin");
                    }}
                    className="text-left text-white py-1.5 px-2 rounded hover:bg-white/10 transition-colors text-sm sm:text-base touch-manipulation"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/signin" onClick={() => setShowMobileMenu(false)}>
                <button className="w-full flex items-center justify-center bg-white text-black px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm font-medium gap-2 mt-2 touch-manipulation active:scale-95 transition-transform">
                  <IoPersonOutline className="w-4 h-4 sm:w-5 sm:h-5" />
                  My Account
                </button>
              </Link>
            )}
          </nav>
        </div>
      )}
      {showChangePassword && (
        <ChangePasswordModal
          onBack={() => setShowChangePassword(false)}
          onConfirm={() => setShowChangePassword(false)}
        />
      )}
      {showRecurring && (
        <RecurringProductModal
          open={true}
          onClose={() => setShowRecurring(false)}
        />
      )}
    </>
  );
}

export default Header;

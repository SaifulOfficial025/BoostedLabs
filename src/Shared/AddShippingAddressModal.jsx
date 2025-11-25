import React, { useRef, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";

function AddShippingAddressModal({ open, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black bg-opacity-30 transition-all">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 mx-2 relative animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        <div className="text-xl font-bold mb-6 text-gray-900">
          Add Shipping Address
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jubayer Ahmad"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+880 1757976790"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Address<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Aqua Tower, Mohakhali, Dhaka"
                required
              />
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-200 transition"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Add Address
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Address Type*
            </label>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold bg-gray-100 text-gray-900 focus:bg-black focus:text-white focus:border-black transition"
              >
                <FaHome className="w-5 h-5" />
                Home
              </button>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold bg-white text-gray-900 focus:bg-black focus:text-white focus:border-black transition"
              >
                <PiBagBold className="w-5 h-5" />
                Office
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold text-base mt-2 mb-2 transition-all hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]"
          >
            Save
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition-all"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default AddShippingAddressModal;

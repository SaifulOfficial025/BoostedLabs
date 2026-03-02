import React from "react";
import { createPortal } from "react-dom";

function ReconstituteModal({ open, onClose, onYes, onNo }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-[90%] mx-auto">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Add Reconstitute Pen?
        </h2>

        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Do you want to add a reconstitute pen? It will charge an extra{" "}
          <span className="font-semibold text-gray-900">$10</span>.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="w-full sm:flex-1 border border-gray-300 rounded-lg py-2.5 text-gray-700 bg-white font-semibold text-base hover:bg-gray-100 transition"
            onClick={onNo}
          >
            No, Thanks
          </button>
          <button
            type="button"
            className="w-full sm:flex-1 rounded-lg py-2.5 text-white bg-black font-semibold text-base hover:bg-gray-900 transition"
            onClick={onYes}
          >
            Yes, Add It
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ReconstituteModal;

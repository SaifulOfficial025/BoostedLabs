import React from "react";

function LogoutModal({ open = true, onClose, onLogout, onBack }) {
  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 sm:p-8 relative">
          <button
            className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-red-500 transition-all"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-8 mt-2">
              Sure! Are you want to log out
            </h2>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6">
              <button
                className="bg-black text-white px-4 py-2 sm:px-6 sm:py-2 rounded font-medium text-sm sm:text-base hover:bg-gray-900"
                onClick={onBack}
              >
                Back
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-2 rounded font-medium text-sm sm:text-base hover:bg-red-600"
                onClick={onLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default LogoutModal;

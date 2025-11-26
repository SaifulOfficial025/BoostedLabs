import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function ChangePasswordModal({ onBack, onConfirm }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 sm:p-8 relative">
        <button
          className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1 bg-black text-white rounded hover:bg-gray-800 text-sm"
          onClick={onBack}
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 mt-2">
          Change Password
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old password
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2 bg-white">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Enter Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New password
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2 bg-white">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Enter Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm new password
            </label>
            <div className="flex items-center border border-gray-200 rounded px-3 py-2 bg-white">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                className="flex-1 bg-transparent outline-none text-sm"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-4 hover:bg-gray-900 transition"
            onClick={(e) => {
              e.preventDefault();
              if (onConfirm)
                onConfirm({ oldPassword, newPassword, confirmPassword });
            }}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

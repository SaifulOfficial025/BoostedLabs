import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import {
  changePassword,
  clearChangePasswordMessage,
} from "../../Redux/ChangePassword";

function ChangePasswordModal({ onBack, onConfirm }) {
  const dispatch = useDispatch();
  const { loading, error, success, successMessage } = useSelector(
    (state) => state.changePassword
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  // Clear success message after 3 seconds and close modal
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearChangePasswordMessage());
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setValidationError("");
        if (onBack) {
          onBack();
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, onBack]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!oldPassword.trim()) {
      setValidationError("Old password is required");
      return;
    }
    if (!newPassword.trim()) {
      setValidationError("New password is required");
      return;
    }
    if (!confirmPassword.trim()) {
      setValidationError("Confirm password is required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    // Dispatch change password action
    dispatch(
      changePassword({
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
    );

    // Call onConfirm if provided
    if (onConfirm) {
      onConfirm({ oldPassword, newPassword, confirmPassword });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 sm:p-8 relative">
        <button
          className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1 bg-black text-white rounded hover:bg-gray-800 text-sm"
          onClick={onBack}
          disabled={loading}
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 mt-2">
          Change Password
        </h2>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.detail ||
              error.old_password?.[0] ||
              error.new_password?.[0] ||
              "Failed to change password"}
          </div>
        )}

        {validationError && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {validationError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-4 hover:bg-gray-900 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Confirming..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;

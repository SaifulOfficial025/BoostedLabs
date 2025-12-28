import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../../../public/BoostedLabLogo.svg";
import { setNewPassword } from "../../Redux/ForgetPassword";

function SetNewPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("forgetPasswordEmail") || "";
    } catch (e) {
      return "";
    }
  });

  const { loading, error, success, successMessage, step } = useSelector(
    (state) => state.forgetPassword
  );

  // Navigate to sign in on success
  useEffect(() => {
    if (success && step === "done") {
      toast.success(successMessage || "Password reset successfully");
      localStorage.removeItem("forgetPasswordEmail");
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    }
  }, [success, successMessage, step, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!email) {
      setValidationError("Email not found. Please start the process again.");
      return;
    }
    if (!password.trim()) {
      setValidationError("Password is required");
      return;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    // Dispatch action
    dispatch(
      setNewPassword({
        email,
        new_password: password,
        confirm_password: confirmPassword,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-4 sm:px-6 py-8 sm:py-12 font-sans md:mt-24">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-2 rounded-lg"
        >
          <FaArrowCircleLeft className="w-5 h-5" />
          Back
        </button>

        <div className="text-center">
          <img src={Logo} alt="logo" className="w-16 sm:w-20 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Set a password
          </h2>
          <p className="text-gray-500 mb-8">
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.detail ||
              error.new_password?.[0] ||
              "Failed to reset password"}
          </div>
        )}

        {validationError && (
          <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Create Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none flex-1 text-gray-700"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="ml-2 text-gray-400"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Re-enter Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none flex-1 text-gray-700"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="ml-2 text-gray-400"
                onClick={() => setShowConfirmPassword((v) => !v)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg mt-2 mb-2 hover:bg-gray-900 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Setting password..." : "Set password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;

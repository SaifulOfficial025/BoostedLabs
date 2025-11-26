import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import Logo from "../../../public/BoostedLabLogo.svg";

function SetNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: handle password reset logic
    console.log("Set password:", password, confirmPassword);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white px-6 py-12 font-sans">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-2 rounded-lg"
        >
          <FaArrowCircleLeft className="w-5 h-5" />
          Back
        </button>

        <div className="text-center">
          <img src={Logo} alt="logo" className="w-20 mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Set a password
          </h2>
          <p className="text-gray-500 mb-8">
            Your previous password has been reseted. Please set a new password
            for your account.
          </p>
        </div>

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
          <Link to="/signin">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 mb-2 hover:bg-gray-900 transition"
            >
              Set password
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SetNewPassword;

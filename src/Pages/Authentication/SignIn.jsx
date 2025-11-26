import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowCircleLeft } from "react-icons/fa";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-start justify-center bg-white  py-5 font-sans mt-10">
        <div className="w-full max-w-lg">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-2 rounded-lg"
          >
            <FaArrowCircleLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white px-4 font-sans">
        <img
          src="/BoostedLabLogo.svg"
          alt="Boosted Labs Logo"
          className="w-16 mb-6"
        />
        <h1 className="text-3xl font-bold text-center mb-2 text-[#222]">
          Sign In
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Please Enter Your Details Below to Continue
        </p>
        <form className="w-full max-w-md flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none flex-1 text-gray-700"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
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
          <div className="flex items-center justify-between text-sm mt-1 mb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((v) => !v)}
                className="accent-black"
              />
              Remember me
            </label>
            <Link
              to="/forget-password-email"
              className="text-black font-bold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <Link to="/">
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold text-lg mt-2 mb-2 hover:bg-gray-900 transition"
            >
              Sign In
            </button>
          </Link>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 bg-white hover:bg-gray-50 transition"
          >
            <img src="/public/google.png" alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">Google</span>
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-8 text-center">
          Don't have an account yet?{" "}
          <Link
            to="/signup"
            className="font-bold text-black underline hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignIn;

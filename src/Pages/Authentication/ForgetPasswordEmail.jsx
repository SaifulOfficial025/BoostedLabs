import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { FaArrowCircleLeft } from "react-icons/fa";

function ForgetPasswordEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans">
        {/* <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-2 rounded-lg self-start"
        >
          <FaArrowCircleLeft className="w-5 h-5" />
          Back
        </button> */}
        <img
          src="/BoostedLabLogo.svg"
          alt="Boosted Labs Logo"
          className="w-16 mb-6"
        />
        <h1 className="text-3xl font-bold text-center mb-2 text-[#222]">
          Forgot your password?
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password
        </p>
        <form className="w-full max-w-xl flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-transparent outline-none flex-1 text-gray-700"
              />
            </div>
          </div>
          <Link to="/otp-verification">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold text-lg mt-2 mb-2 hover:bg-gray-900 transition"
            >
              Send OTP
            </button>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default ForgetPasswordEmail;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiMail } from "react-icons/fi";
import { FaArrowCircleLeft } from "react-icons/fa";
import Logo from "../../../public/BoostedLabLogo.svg";
import {
  sendForgetPasswordEmail,
  clearForgetPasswordError,
} from "../../Redux/ForgetPassword";

function ForgetPasswordEmail() {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, successMessage } = useSelector(
    (state) => state.forgetPassword
  );

  // Navigate to OTP page on success
  useEffect(() => {
    if (success) {
      // Store email in localStorage for next steps
      localStorage.setItem("forgetPasswordEmail", email);
      setTimeout(() => {
        navigate("/forget-password-otp");
      }, 1500);
    }
  }, [success, email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Validate email
    if (!email.trim()) {
      setValidationError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    // Dispatch action
    dispatch(sendForgetPasswordEmail({ email }));
  };
  return (
    <section>
      <div className="flex items-start justify-center bg-white py-5 font-sans mt-10 px-4 sm:px-6">
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
      <div className="flex flex-col items-center justify-center bg-white px-4 sm:px-6 md:px-10 font-sans mt-10">
        <img
          src={Logo}
          alt="Boosted Labs Logo"
          className="w-14 sm:w-16 md:w-20 mb-6"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#222]">
          Forgot your password?
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password
        </p>
        <form
          className="w-full max-w-xl flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-lg mt-2 mb-2 transition ${
              loading
                ? "bg-gray-400 text-gray-700"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ForgetPasswordEmail;

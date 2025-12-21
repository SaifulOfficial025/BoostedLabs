import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyEmail } from "../../Redux/Auth";
import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import Logo from "../../../public/BoostedLabLogo.svg";

function RegisteringOTP() {
  const navigate = useNavigate();
  const [values, setValues] = useState(["", "", "", ""]);
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("otpEmail") || "";
    } catch (e) {
      return "";
    }
  });
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(120);
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth || { loading: false });

  useEffect(() => {
    // start countdown
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  useEffect(() => {
    // focus first input on mount
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...values];
    next[index] = val;
    setValues(next);
    if (val && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!paste) return;
    const next = ["", "", "", ""];
    paste.split("").forEach((ch, i) => (next[i] = ch));
    setValues(next);
    // focus after last filled
    const last = Math.min(paste.length - 1, 3);
    if (inputsRef.current[last]) inputsRef.current[last].focus();
    e.preventDefault();
  };

  const handleResend = () => {
    setValues(["", "", "", ""]);
    setSecondsLeft(120);
    if (inputsRef.current[0]) inputsRef.current[0].focus();
    // TODO: trigger resend OTP API
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = values.join("");
    if (!email) {
      toast.error("Please enter your email to verify.");
      return;
    }
    (async () => {
      try {
        const result = await dispatch(verifyEmail({ email, code })).unwrap();
        const msg =
          result.message || result.detail || "Email verified successfully";
        toast.success(String(msg));
        navigate("/signin");
      } catch (err) {
        const msg =
          (err && (err.detail || err.message)) ||
          JSON.stringify(err) ||
          "Verification failed";
        toast.error(String(msg));
      }
    })();
  };

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss} Sec`;
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Verify code</h2>
          <p className="text-gray-500 mb-8">
            An authentication code has been sent to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white">
          <label className="block text-sm font-medium text-gray-700 text-center mb-4">
            Enter Code
          </label>

          <div
            className="flex items-center justify-center gap-3 sm:gap-4 mb-3"
            onPaste={handlePaste}
          >
            {values.map((v, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                value={v}
                onChange={(e) => handleChange(i, e)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center rounded-lg border border-gray-200 text-xl font-medium"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
              />
            ))}
          </div>

          <div className="text-center text-gray-500 mb-6">
            {formatTime(secondsLeft)}
          </div>

          <div className="text-center mb-6">
            <span className="text-gray-500">Didn't receive a code? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={`font-medium ${
                secondsLeft > 0 ? "text-gray-400" : "text-black underline"
              }`}
            >
              Resend
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg mt-2 mb-2 hover:bg-gray-900 transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisteringOTP;

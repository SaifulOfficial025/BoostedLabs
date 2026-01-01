import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowCircleLeft } from "react-icons/fa";
import GoogleImg from "../../../public/google.png";

import Logo from "../../../public/BoostedLabLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth";
import { socialLogin } from "../../Redux/SocialLogin";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth || { loading: false });
  const { loading: socialLoading } = useSelector(
    (state) => state.socialLogin || { loading: false }
  );

  // Initialize Google OAuth Client
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onerror = () => {
      console.error("Failed to load Google Sign-In script");
      toast.error("Failed to load Google Sign-In");
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleGoogleLogin = async (tokenResponse) => {
    try {
      // Fetch user info from Google using the access token
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const userInfo = await userInfoResponse.json();
      const userEmail = userInfo.email;

      if (!userEmail) {
        throw new Error("Email not found in Google account");
      }

      // Send email to backend social login
      await dispatch(socialLogin({ email: userEmail })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error(err.message || "Google sign-in failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      // show success message; try to pick human-friendly fields
      const successMsg =
        result.message || result.detail || "Signed in successfully";
      toast.success(String(successMsg));
      // navigate after successful login if needed
      navigate("/");
    } catch (err) {
      // err may be an object with detail or an array of errors
      const msg =
        (err && (err.detail || err.message)) ||
        JSON.stringify(err) ||
        "Login failed";
      toast.error(String(msg));
    }
  };

  const handleGoogleClick = () => {
    if (!window.google) {
      toast.error("Google Sign-In not loaded yet. Please try again.");
      return;
    }

    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "email profile openid",
        callback: handleGoogleLogin,
      });

      // This opens a popup window for Google authentication
      client.requestAccessToken();
    } catch (error) {
      console.error("Error initiating Google Sign-In:", error);
      toast.error("Failed to open Google Sign-In");
    }
  };

  return (
    <section>
      <div className="flex items-start justify-center bg-white py-5 font-sans mt-10 px-4 sm:px-6">
        <div className="w-full max-w-lg">
          <Link to="/">
            <button
              // onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 mb-6 bg-black text-white px-3 py-2 rounded-lg"
            >
              <FaArrowCircleLeft className="w-5 h-5" />
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-white px-4 sm:px-6 md:px-10 font-sans">
        <Link to="/">
          <img
            src={Logo}
            alt="Boosted Labs Logo"
            className="w-14 sm:w-16 md:w-20 mb-6"
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#222]">
          Sign In
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Please Enter Your Details Below to Continue
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-[#f6fafd]">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none flex-1 text-gray-700"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none flex-1 text-gray-700"
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-2 rounded-lg font-semibold text-base sm:text-lg mt-2 mb-2 hover:bg-gray-900 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <button
            type="button"
            onClick={handleGoogleClick}
            disabled={socialLoading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 bg-white hover:bg-gray-50 transition disabled:opacity-60"
          >
            <img src={GoogleImg} alt="Google" className="w-5 h-5" />
            <span className="font-medium text-gray-700">
              {socialLoading ? "Signing in..." : "Google"}
            </span>
          </button>
        </form>
        <p className="text-gray-500 text-xs sm:text-sm mt-8 text-center mb-10">
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

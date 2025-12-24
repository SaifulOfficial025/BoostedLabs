import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowCircleLeft } from "react-icons/fa";
import GoogleImg from "../../../public/google.png";
import Logo from "../../../public/BoostedLabLogo.svg";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Auth";
import { socialLogin } from "../../Redux/SocialLogin";
import { toast } from "react-toastify";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((s) => s.auth || { loading: false });
  const { loading: socialLoading } = useSelector(
    (s) => s.socialLogin || { loading: false }
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
      toast.success("Account created with Google successfully");
      navigate("/");
    } catch (err) {
      console.error("Google sign-up error:", err);
      toast.error(err.message || "Google sign-up failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save email BEFORE registration to ensure it's available
    console.log("Saving email to localStorage:", email);
    localStorage.setItem("otpEmail", email);

    try {
      const result = await dispatch(
        register({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          confirm_password: confirmPassword,
        })
      ).unwrap();
      const successMsg =
        result.message || result.detail || "Registration successful";
      toast.success(String(successMsg));

      // Navigate to OTP page
      navigate("/registering-otp-verification");
    } catch (err) {
      const msg =
        (err && (err.detail || err.message)) ||
        JSON.stringify(err) ||
        "Registration failed";
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
        client_id:
          "417880520830-jl84vl0urfbci6c4ufuref65cgksreb8.apps.googleusercontent.com",
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
          Register for an account
        </h1>
        <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
          Please Enter Your Details Below to Sign up
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
                className="w-full border border-gray-200 rounded-lg px-3 py-3 text-gray-700"
              />
            </div>
          </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
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
                Re-Enter Password
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg mt-2 mb-2 hover:bg-gray-900 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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
              {socialLoading ? "Signing up..." : "Google"}
            </span>
          </button>
        </form>

        <p className="text-gray-500 text-xs sm:text-sm mt-8 text-center mb-10">
          Have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-black hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;

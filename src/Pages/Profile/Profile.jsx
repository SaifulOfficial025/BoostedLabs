import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Footer from "../../Shared/Footer";
import Noticebar from "../../Shared/Noticebar";
import Headers from "../../Shared/Header";
import { fetchProfile, updateProfile } from "../../Redux/Profile";
import { BASE_URL } from "../../Redux/baseUrl";
import { Link } from "react-router-dom";
import profileimg from "../.././../public/dummy.jpg";

function Profile() {
  const dispatch = useDispatch();
  const { profileData, loading, error, updateLoading } = useSelector(
    (state) => state.profile
  );

  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update form fields when profile data is loaded
  useEffect(() => {
    if (profileData) {
      setFirstName(profileData.first_name || "");
      setLastName(profileData.last_name || "");
      setEmail(profileData.email || "");
      // If image exists and is a relative path, prepend BASE_URL
      if (profileData.image) {
        const imageUrl = profileData.image.startsWith("http")
          ? profileData.image
          : `${BASE_URL}${profileData.image}`;
        setImagePreview(imageUrl);
      } else {
        setImagePreview(null);
      }
    }
  }, [profileData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (editMode) {
      // Validate required fields
      if (
        !firstName ||
        firstName.trim() === "" ||
        !lastName ||
        lastName.trim() === ""
      ) {
        window.alert("First Name and Last Name are required.");
        return;
      }

      // Save changes
      const result = await dispatch(
        updateProfile({
          first_name: firstName,
          last_name: lastName,
          email: email,
          imageFile: imageFile, // Send the actual file, not base64
        })
      );

      // If successful, exit edit mode
      if (result.type === "profile/updateProfile/fulfilled") {
        setEditMode(false);
        setImageFile(null);
      }
    } else {
      // Enter edit mode
      setEditMode(true);
    }
  };

  if (loading && !profileData) {
    return (
      <section>
        <Headers />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 font-sans mt-20">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section>
      <Headers />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 font-sans mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-9">
          <Link to="/">
            <button className="flex items-center gap-2 text-sm text-white mb-2 sm:mb-6 hover:underline px-3 py-1.5 bg-black rounded">
              <FaArrowLeft /> Back
            </button>
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.detail || "Failed to load profile"}
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={imagePreview || profileimg}
              alt="Profile"
              className="w-28 h-28 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-gray-200"
            />
            {editMode && (
              <label
                htmlFor="profile-image-upload"
                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <FaEdit />
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Personal Information
            </h2>
            <button
              className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
              onClick={handleSave}
              disabled={updateLoading}
            >
              {updateLoading ? (
                "Saving..."
              ) : editMode ? (
                "Save"
              ) : (
                <>
                  <FaEdit /> Edit
                </>
              )}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                required
                aria-required="true"
                className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                required
                aria-required="true"
                className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none disabled:bg-gray-100 cursor-not-allowed"
              value={email}
              disabled={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;

import React, { useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import Footer from "../../Shared/Footer";
import Noticebar from "../../Shared/Noticebar";
import Headers from "../../Shared/Header";

function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Jubayer");
  const [lastName, setLastName] = useState("Ahmad");
  const [email, setEmail] = useState("ahmadjubayerr@gmail.com");
  const [password, setPassword] = useState("********");

  return (
    <section>
      <Noticebar />
      <Headers />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 md:px-8 font-sans mt-20">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-9">
          <button className="flex items-center gap-2 text-sm text-white mb-2 sm:mb-6 hover:underline px-3 py-1.5 bg-black rounded">
            <FaArrowLeft /> Back
          </button>
          {/* <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1> */}
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="/public/profiledummyimage.png"
              alt="Profile"
              className="w-28 h-28 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-gray-200"
            />
            <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow text-gray-700 hover:bg-gray-100">
              <FaEdit />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Personal Information
            </h2>
            <button
              className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded text-sm font-medium hover:bg-gray-800"
              onClick={() => setEditMode((e) => !e)}
            >
              {editMode ? (
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
                className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!editMode}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!editMode}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
              value={email}
              disabled={editMode}
            />
          </div>
        </div>

        <div className="mb-8 ">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 ">
            Delete your account
          </h2>
          <p className="text-sm sm:text-md text-gray-600 mb-4">
            By deleting your account, you'll no longer be able to access any of
            your data or log in to Boosted Labs. Your Boosted Labs account was
            created at 2:03 PM, Jun 31, 2025.
          </p>
          <button className="bg-red-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;

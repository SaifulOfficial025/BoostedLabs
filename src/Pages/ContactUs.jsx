import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Noticebar from "../Shared/Noticebar";
import Headers from "../Shared/Header";
import Footer from "../Shared/Footer";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { sendContactMessage, clearContactUsMessage } from "../Redux/ContactUs";
import { ImWhatsapp } from "react-icons/im";

function ContactUs() {
  const dispatch = useDispatch();
  const { loading, error, success, successMessage } = useSelector(
    (state) => state.contactUs
  );

  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    project_details: "",
  });

  // Clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearContactUsMessage());
        // Reset form
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          project_details: "",
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendContactMessage({
        name: formData.name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        project_details: formData.project_details,
      })
    );
  };

  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";

  return (
    <section id="contact-section">
      <div className="max-w-7xl mx-auto px-6 py-12 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-32">
          {/* Left: contact info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Get in Touch With Us
            </h2>
            <p className="text-gray-600 mb-6">
              Have questions or need support? Our team is here to help you with
              orders, returns, product info, and more.
            </p>

            <div className="mb-6 text-gray-700">
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 text-gray-700">
                  <FaLocationDot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    Address:
                  </div>
                  <div className="text-sm text-gray-600">
                    Melbourne, Australia
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 text-gray-700">
                  <FaPhone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    What's app:
                  </div>
                  <div className="text-sm text-gray-600">+61 478 101 857</div>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-3">
                <div className="mt-1 text-gray-700">
                  <MdEmail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    Email:
                  </div>
                  <div className="text-sm text-gray-600">
                    Boostedlabs@hotmail.com
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="font-semibold mb-2">Follow Us</div>
              <div className="flex items-center gap-3">
                <a className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center">
                  <FaFacebookF />
                </a>
                <a
                  className="w-8 h-8 rounded bg-blue-400 text-white flex items-center justify-center"
                  href="https://wa.me/61478101857"
                >
                  <ImWhatsapp />
                </a>
                <a
                  className="w-8 h-8 rounded bg-pink-500 text-white flex items-center justify-center"
                  href="https://www.instagram.com/boostedlab"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error.detail || "Failed to send message"}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                      placeholder="Enter Your Full Name"
                      required
                      aria-required="true"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      WhatsApp Number (Optional)
                    </label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                      placeholder="+61 478 101 857"
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    placeholder="Enter Your Email"
                    required
                    aria-required="true"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="mt-1 w-full border border-gray-200 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                    rows={5}
                    placeholder="Tell us about your idea..."
                    required
                    aria-required="true"
                    name="project_details"
                    value={formData.project_details}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded shadow-sm hover:bg-gray-800 disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Contact Us"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 mb-16">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Melbourne%20Australia&output=embed"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default ContactUs;

import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHome } from "react-icons/fa";
import { PiBagBold } from "react-icons/pi";
import { guestCheckout, clearGuestCheckoutData } from "../Redux/GuestCheckout";
import { getGuestCart, clearGuestCart } from "../utils/guestCart";

function GuestAddressModal({
  open,
  onClose,
  isSubscription = false,
  freeTshirtSize = null,
}) {
  const modalRef = useRef(null);
  const checkoutWindowRef = useRef(null);
  const dispatch = useDispatch();
  const { checkoutData, loading } = useSelector((state) => state.guestCheckout);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    type: "home",
    email: "",
  });

  // Handle checkout success
  useEffect(() => {
    if (checkoutData && checkoutData.checkout_url) {
      // Redirect the opened window to the checkout URL
      if (checkoutWindowRef.current && !checkoutWindowRef.current.closed) {
        checkoutWindowRef.current.location.href = checkoutData.checkout_url;
      } else {
        // Fallback: open in new tab if window was closed or blocked
        window.open(checkoutData.checkout_url, "_blank");
      }
      // Clear guest cart after successful checkout
      clearGuestCart();
      // Clear checkout data and close modal
      checkoutWindowRef.current = null;
      dispatch(clearGuestCheckoutData());
      onClose();
    }
  }, [checkoutData, dispatch, onClose]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      type,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get guest cart items
    const guestCart = getGuestCart();

    if (guestCart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Open a blank window immediately to avoid popup blockers
    checkoutWindowRef.current = window.open("", "_blank");
    if (checkoutWindowRef.current) {
      checkoutWindowRef.current.document.write(
        "<html><body><p>Loading checkout...</p></body></html>"
      );
    }

    // Format cart items for API
    const cartItems = guestCart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));

    dispatch(
      guestCheckout({
        cartItems,
        address: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          type: formData.type,
        },
        email: formData.email,
        isSubscription,
        freeTshirtSize,
      })
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black bg-opacity-30 transition-all">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 mx-2 relative animate-fadeIn"
        role="dialog"
        aria-modal="true"
      >
        <div className="text-xl font-bold mb-6 text-gray-900">
          Checkout Information
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Full Name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Phone Number"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">
              Address Type*
            </label>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleTypeChange("home")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold transition ${
                  formData.type === "home"
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <FaHome className="w-5 h-5" />
                Home
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("office")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-semibold transition ${
                  formData.type === "office"
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-900"
                }`}
              >
                <PiBagBold className="w-5 h-5" />
                Office
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold text-base mt-2 mb-2 transition-all hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Go for Payment"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition-all"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default GuestAddressModal;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaFire } from "react-icons/fa";
import ShoppingCartModal from "./ShoppingCartModal";
import ReconstituteModal from "./ReconstituteModal";
import { addToCart, fetchCart } from "../Redux/Cart";
import { addToGuestCart } from "../utils/guestCart";

function ProductCard({
  badge = {
    icon: <FaFire />,
    text: "WEIGHT LOSS",
    color: "bg-blue-100",
    textColor: "text-blue-700",
  },
  image,
  title,
  description,
  price,
  onViewDetails,
  productId,
  onAddToCart,
  hideActions = false,
  isInStock = true,
  isComingSoon = false,
  reconstitutePen = false,
}) {
  const [showCart, setShowCart] = useState(false);
  const [showReconstituteModal, setShowReconstituteModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location?.pathname || "";
  const isMerch = pathname.startsWith("/merchandise");
  const isLoggedIn = !!localStorage.getItem("auth");

  const performAddToCart = async (withReconstitutePen = null) => {
    if (productId !== undefined) {
      if (isLoggedIn) {
        // Logged-in user: dispatch to Redux and backend
        const payload = { productId, quantity: 1 };
        if (withReconstitutePen !== null) {
          payload.reconstitute_pen = withReconstitutePen;
        }
        const result = await dispatch(addToCart(payload));
        if (result.type === "cart/addToCart/fulfilled") {
          // Fetch updated cart data
          await dispatch(fetchCart());
          setShowCart(true);
        }
      } else {
        // Guest user: add to localStorage
        try {
          addToGuestCart(productId, 1, null, null, null, withReconstitutePen);
          setShowCart(true);
        } catch (error) {
          console.error("Error adding to guest cart:", error);
        }
      }
    } else {
      // Fallback if no productId
      if (onAddToCart) onAddToCart();
      setShowCart(true);
    }
  };

  const handleAddToCart = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // If reconstitute_pen is true for this product, show the modal
    if (reconstitutePen) {
      setShowReconstituteModal(true);
      return;
    }

    // Otherwise, add to cart directly
    await performAddToCart(null);
  };

  const handleReconstituteYes = async () => {
    setShowReconstituteModal(false);
    await performAddToCart(true);
  };

  const handleReconstituteNo = async () => {
    setShowReconstituteModal(false);
    await performAddToCart(false);
  };

  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const defaultImage = isMerch
    ? `${base}dummyshirt.png`
    : `${base}dummyproduct.png`;

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-3 max-w-xs mx-auto sm:mx-0 mt-5 font-sans hover:shadow-lg transform hover:scale-105 transition duration-300 flex flex-col h-full">
      <div className="relative mb-4">
        {!isMerch && (
          <div
            className={`absolute right-0 top-0 flex items-center gap-2 px-3 py-1 rounded-tr-md rounded-bl-md ${badge.color}`}
          >
            <span className={`text-lg ${badge.textColor}`}>{badge.icon}</span>
            <span className={`text-xs font-semibold ${badge.textColor}`}>
              {badge.text}
            </span>
          </div>
        )}
        {/* Stock Status Badge */}
        {/* {isComingSoon && (
          <div className="absolute left-0 top-0 bg-purple-500 text-white px-3 py-1 rounded-tl-md rounded-br-md text-xs font-semibold">
            Coming Soon
          </div>
        )}
        {!isComingSoon && !isInStock && (
          <div className="absolute left-0 top-0 bg-red-500 text-white px-3 py-1 rounded-tl-md rounded-br-md text-xs font-semibold">
            Out of Stock
          </div>
        )} */}
        <div
          className="rounded-xl flex items-center justify-center cursor-pointer h-[180px] bg-gray-50"
          onClick={() => {
            // navigate to product details when clicking image area
            if (productId !== undefined)
              navigate(`/product-details/${productId}`);
            if (onViewDetails) onViewDetails();
          }}
        >
          <img
            src={image || defaultImage}
            alt={title}
            loading="lazy"
            className="object-contain w-full h-full"
            onError={(e) => {
              const fallback = defaultImage;
              if (e.currentTarget.src !== fallback)
                e.currentTarget.src = fallback;
            }}
          />
        </div>
      </div>
      <div className="mb-4 flex-grow flex flex-col">
        <h2
          className="text-lg sm:text-xl font-bold text-[#222] mb-2 cursor-pointer text-center sm:text-left line-clamp-2"
          onClick={() => {
            if (productId !== undefined)
              navigate(`/product-details/${productId}`);
            if (onViewDetails) onViewDetails();
          }}
        >
          {title}
        </h2>
        <p className="text-sm text-[#3a4a5c] leading-snug text-center sm:text-left line-clamp-2 flex-grow">
          {description}
        </p>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-[#222] mb-4 text-center sm:text-left">
        ${price}
      </div>
      {!hideActions && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="w-full sm:flex-1 border border-[#222] rounded-lg py-2 text-[#222] bg-white font-semibold text-base hover:bg-gray-200 transition"
            onClick={(e) => {
              e.stopPropagation();
              if (onViewDetails) onViewDetails();
              if (productId !== undefined)
                navigate(`/product-details/${productId}`);
            }}
          >
            View Details
          </button>
          <button
            type="button"
            className={`w-full sm:flex-1 rounded-lg py-2 text-white font-semibold text-base transition-all duration-300 ease-in-out ${
              !isInStock || isComingSoon
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-900 hover:shadow-lg active:scale-95"
            }`}
            onClick={(e) => {
              if (isInStock && !isComingSoon) {
                handleAddToCart(e);
              }
            }}
            disabled={!isInStock || isComingSoon}
          >
            {isComingSoon
              ? "Coming Soon"
              : !isInStock
                ? "Out of Stock"
                : "Add To Cart"}
          </button>
        </div>
      )}
      {showCart && (
        <ShoppingCartModal open={showCart} onClose={() => setShowCart(false)} />
      )}
      {showReconstituteModal && (
        <ReconstituteModal
          open={showReconstituteModal}
          onClose={() => setShowReconstituteModal(false)}
          onYes={handleReconstituteYes}
          onNo={handleReconstituteNo}
        />
      )}
    </div>
  );
}

export default ProductCard;

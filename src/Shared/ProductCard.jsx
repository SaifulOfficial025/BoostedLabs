import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaFire } from "react-icons/fa";
import ShoppingCartModal from "./ShoppingCartModal";
import { addToCart, fetchCart } from "../Redux/Cart";

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
}) {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location?.pathname || "";
  const isMerch = pathname.startsWith("/merchandise");

  const handleAddToCart = async () => {
    if (productId !== undefined) {
      const result = await dispatch(addToCart({ productId, quantity: 1 }));
      if (result.type === "cart/addToCart/fulfilled") {
        // Fetch updated cart data
        await dispatch(fetchCart());
        setShowCart(true);
      }
    } else {
      // Fallback if no productId
      if (onAddToCart) onAddToCart();
      setShowCart(true);
    }
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
            className="w-full sm:flex-1 rounded-lg py-2 text-white bg-black font-semibold text-base hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
            onClick={(e) => {
              // prevent parent click handlers
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Add To Cart
          </button>
        </div>
      )}
      {showCart && (
        <ShoppingCartModal open={showCart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductCard;

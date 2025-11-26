import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFire } from "react-icons/fa";
import ShoppingCartModal from "./ShoppingCartModal";

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
}) {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm p-3 max-w-xs  font-sans">
      <div className="relative mb-4">
        <div
          className={`absolute flex items-center gap-2 px-3 py-1 rounded-tl-md rounded-br-md ${badge.color}`}
        >
          <span className={`text-lg ${badge.textColor}`}>{badge.icon}</span>
          <span className={`text-xs font-semibold ${badge.textColor}`}>
            {badge.text}
          </span>
        </div>
        <div
          className="rounded-xl border border-[#e5e7eb] p-2 flex items-center justify-center bg-[#f8fafc] cursor-pointer"
          style={{ minHeight: "180px" }}
          onClick={() => {
            // navigate to product details when clicking image area
            if (productId !== undefined)
              navigate(`/shop/product-details/${productId}`);
            if (onViewDetails) onViewDetails();
          }}
        >
          <img src={image} alt={title} className="max-h-28 object-contain " />
        </div>
      </div>
      <div className="mb-2">
        <h2
          className="text-xl font-bold text-[#222] mb-1 cursor-pointer"
          onClick={() => {
            if (productId !== undefined)
              navigate(`/shop/product-details/${productId}`);
            if (onViewDetails) onViewDetails();
          }}
        >
          {title}
        </h2>
        <p className="text-sm text-[#3a4a5c] leading-snug">{description}</p>
      </div>
      <div className="text-2xl font-bold text-[#222] mb-4 mt-5">${price}</div>
      <div className="flex gap-3">
        <button
          className="flex-1 border border-[#222] rounded-lg py-2 text-[#222] bg-white font-semibold text-base hover:bg-gray-50 transition"
          onClick={(e) => {
            e.stopPropagation();
            if (onViewDetails) onViewDetails();
            if (productId !== undefined)
              navigate(`/shop/product-details/${productId}`);
          }}
        >
          View Details
        </button>
        <button
          className="flex-1 rounded-lg py-2 text-white bg-black font-semibold text-base hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out"
          onClick={(e) => {
            // prevent parent click handlers
            e.stopPropagation();
            onAddToCart();
            setShowCart(true);
          }}
        >
          Add To Cart
        </button>
      </div>
      {showCart && (
        <ShoppingCartModal open={showCart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductCard;

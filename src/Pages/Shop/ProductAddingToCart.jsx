import React, { useState } from "react";
import { FaStar, FaShareAlt } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import ShoppingCartModal from "../../Shared/ShoppingCartModal";

function ProductAddingToCart({
  image,
  title = "Retatrutide",
  rating = 4.5,
  reviews = 17,
  price = 215,
  oldPrice = 290,
  badge = "ENERGY",
  onAdd = () => {},
}) {
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const productImage = image || `${base}dummyproduct.png`;
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);

  const decrease = () => setQty((q) => Math.max(1, q - 1));
  const increase = () => setQty((q) => q + 1);

  return (
    <div className="max-w-7xl mx-auto  py-10 mt-14 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-md">
        <div className=" bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="relative">
            {badge && (
              <div className="absolute  bg-blue-100 text-blue-700 text-md px-2 py-1 rounded-tl-md rounded-br-md">
                {badge}
              </div>
            )}
            <div
              className="flex items-center justify-center p-6 bg-[#f8fafc] rounded-lg"
              style={{ minHeight: 420 }}
            >
              <img src={productImage} alt={title} className=" object-contain" />
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-yellow-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar className="text-gray-300" />
                </div>
                <div className="text-sm text-gray-600">
                  {rating} ({reviews} reviews)
                </div>
              </div>
            </div>
            <button className="text-gray-500 p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <FaShareAlt />
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={decrease}
                className="w-8 h-8 flex items-center justify-center border rounded"
              >
                -
              </button>
              <div className="w-10 h-8 flex items-center justify-center border">
                {qty}
              </div>
              <button
                onClick={increase}
                className="w-8 h-8 flex items-center justify-center border rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-baseline gap-4">
              <div className="text-2xl font-bold text-gray-900">
                ${(price * qty).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400 line-through">
                ${oldPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                onAdd(qty);
                setShowCart(true);
              }}
              className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-800 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out"
            >
              <LuShoppingCart className="w-6 h-6" /> Add to Cart
            </button>
            <div className="text-xs text-gray-500 mt-2">
              Enjoy FREE express & Free Returns on orders over $35! Kindly place
              your order early for expedited processing.
            </div>
          </div>

          <div className="mt-10">
            <span className="font-bold text-sm ">Payment Methods:</span>
          </div>
          <div className="mt-2 flex items-center gap-3 ">
            <img
              src={`${base}visa.png`}
              alt="visa"
              className="h-10 rounded-md border p-1"
            />
            <img
              src={`${base}master.png`}
              alt="mc"
              className="h-10 rounded-md border p-1"
            />
            <img
              src={`${base}amex.png`}
              alt="amex"
              className="h-10 rounded-md border p-1"
            />
          </div>
        </div>
      </div>
      {showCart && (
        <ShoppingCartModal open={showCart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductAddingToCart;

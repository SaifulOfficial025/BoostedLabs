import React, { useState, useEffect, useRef } from "react";
import AddShippingAddressModal from "./AddShippingAddressModal";
import SmallProductComponentWithVolumeModificationandPrice from "./SmallProductComponentWithVolumeModificationandPrice";

const cartItems = [
  {
    id: 1,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
  {
    id: 2,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
  {
    id: 3,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
];

function ShoppingCartModal({ open, onClose }) {
  const modalRef = useRef(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      // If the AddShippingAddressModal is open, clicking outside the cart
      // (i.e. on the address modal) should NOT close the cart. So ignore
      // closing when showAddressModal is true.
      if (showAddressModal) return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open && !showAddressModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose, showAddressModal]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`mt-12 fixed inset-0 z-50 flex justify-end items-start transition-opacity duration-300 ease-out ${
          open ? "bg-black bg-opacity-20" : "pointer-events-none bg-opacity-0"
        }`}
        style={{
          visibility: open ? "visible" : "hidden",
          opacity: open ? 1 : 0,
        }}
      >
        <div
          ref={modalRef}
          className={`w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl overflow-y-auto transform transition-transform duration-700 ease-in-out ${
            open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{ willChange: "transform, opacity" }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold text-[#222] flex items-center gap-2">
              <svg
                width="22"
                height="22"
                fill="none"
                stroke="#222"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Shopping Cart
            </span>
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-red-500 transition-all"
            >
              &times;
            </button>
          </div>
          <div className="px-6 py-2">
            <label className="flex items-center gap-2 mb-4 cursor-pointer">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-[#222] text-sm">Select All</span>
            </label>
            {cartItems.map((item) => (
              <SmallProductComponentWithVolumeModificationandPrice
                key={item.id}
                checked={false}
                onCheck={() => {}}
                image={item.image}
                badge={item.badge}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onDecrease={() => {}}
                onIncrease={() => {}}
                onRemove={() => {}}
              />
            ))}
          </div>
          <div className="px-6 py-4">
            <div className="bg-[#f6fafd] rounded-xl border border-[#e5e7eb] p-4 mb-4">
              <div className="font-semibold mb-2">Billing</div>
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>$215</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping Fee</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>Total</span>
                <span>$230</span>
              </div>
              <div className="text-xs text-[#7b8ca3] mb-2">
                Tax also included
              </div>
              <label className="flex items-center gap-2 mb-2 cursor-pointer mt-5 ">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-[#222] text-lg font-bold">
                  I want to buy every month.
                </span>
              </label>
              <button
                className="w-full bg-black text-white py-2 rounded-lg font-semibold text-base mt-2 mb-2 transition-all hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]"
                onClick={() => setShowAddressModal(true)}
              >
                Proceed to checkout
              </button>
              <div className="flex flex-col gap-1 mt-2">
                <span className="flex items-center gap-2 text-green-600 text-sm">
                  <span className="w-3 h-3 rounded-full border-2 border-green-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  </span>
                  Secure checkout
                </span>
                <span className="flex items-center gap-2 text-blue-600 text-sm">
                  <span className="w-3 h-3 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  </span>
                  Fast & discreet shipping
                </span>
                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="w-3 h-3 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  </span>
                  Third-party tested products
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddressModal && (
        <AddShippingAddressModal
          open={showAddressModal}
          onClose={() => setShowAddressModal(false)}
        />
      )}
    </>
  );
}
export default ShoppingCartModal;

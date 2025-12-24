import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import AddShippingAddressModal from "./AddShippingAddressModal";
import SmallProductComponentWithVolumeModificationandPrice from "./SmallProductComponentWithVolumeModificationandPrice";
import SizeSelection from "./Sizeselection";
import {
  fetchCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/Cart";
import { BASE_URL } from "../Redux/baseUrl";

function ShoppingCartModal({ open, onClose }) {
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const [showAddressModal, setShowAddressModal] = useState(false);

  const {
    items,
    subtotal,
    shippingFee,
    total,
    loading,
    eligibleForFreeTshirt,
  } = useSelector((state) => state.cart);

  const [selectAll, setSelectAll] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  // Fetch cart data when modal opens
  useEffect(() => {
    if (open) {
      dispatch(fetchCart());
    }
  }, [open, dispatch]);

  // Initialize checked items when items change
  useEffect(() => {
    if (items.length > 0) {
      const initialChecked = {};
      items.forEach((item) => {
        initialChecked[item.id] = true;
      });
      setCheckedItems(initialChecked);
      setSelectAll(true);
    }
  }, [items]);

  // Local mount/visibility state so the modal can animate on mount/unmount
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  // Manage mount + animation state
  useEffect(() => {
    let timeoutId;
    if (open) {
      setIsMounted(true);
      // ensure the element is mounted first, then trigger the visible state
      // so the transition from translate-x-full -> translate-x-0 runs
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      // start hide animation
      setIsVisible(false);
      // unmount after the transition duration (300ms)
      timeoutId = setTimeout(() => setIsMounted(false), 350);
    }
    return () => clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event) {
      // If the AddShippingAddressModal is open, clicking outside the cart
      // (i.e. on the address modal) should NOT close the cart.
      if (showAddressModal) return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    // attach listener while modal is mounted (even during closing animation)
    if (isMounted && !showAddressModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMounted, onClose, showAddressModal]);

  // Lock background scroll while modal is mounted (visible or animating)
  useEffect(() => {
    if (!isMounted) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isMounted]);

  // keep selectAll in sync when checkedItems changes
  useEffect(() => {
    const allChecked =
      items.length > 0 && items.every((item) => checkedItems[item.id] === true);
    setSelectAll(allChecked);
  }, [checkedItems, items]);

  function toggleSelectAll() {
    const next = !selectAll;
    setSelectAll(next);
    const newChecked = {};
    items.forEach((item) => {
      newChecked[item.id] = next;
    });
    setCheckedItems(newChecked);
  }

  function toggleItemCheck(id) {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  function handleIncreaseQuantity(id) {
    dispatch(increaseQuantity(id));
  }

  function handleDecreaseQuantity(id) {
    dispatch(decreaseQuantity(id));
  }

  function handleRemoveItem(id) {
    dispatch(removeCartItem(id));
  }

  const selectedSubtotal = items.reduce((sum, item) => {
    if (checkedItems[item.id]) {
      const price = parseFloat(
        item.product.discounted_price || item.product.initial_price
      );
      return sum + price * item.quantity;
    }
    return sum;
  }, 0);

  const selectedShippingFee = selectedSubtotal > 0 ? shippingFee : 0;
  const selectedTotal = selectedSubtotal + selectedShippingFee;
  const [selectedSize, setSelectedSize] = useState("S");

  return createPortal(
    <>
      <div
        className={`mt-12 fixed inset-0 z-[9999] flex justify-end items-start transition-opacity duration-300 ease-out ${
          isVisible
            ? "bg-black bg-opacity-40"
            : "pointer-events-none bg-opacity-0"
        }`}
        style={{
          visibility: isVisible ? "visible" : "hidden",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          ref={modalRef}
          className={`w-full max-w-md h-full bg-white shadow-2xl rounded-l-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
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
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <span className="text-[#222] text-sm">Select All</span>
            </label>
            {loading && (
              <div className="text-center text-gray-500 py-6">
                Loading cart...
              </div>
            )}
            {!loading && items.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                Your cart is empty
              </div>
            )}
            {!loading &&
              items.map((item) => {
                const imageUrl = item.product.logo
                  ? `${BASE_URL}${item.product.logo}`
                  : "/product-weightloss.png";
                const price = parseFloat(
                  item.product.discounted_price || item.product.initial_price
                );

                return (
                  <SmallProductComponentWithVolumeModificationandPrice
                    key={item.id}
                    checked={!!checkedItems[item.id]}
                    onCheck={() => toggleItemCheck(item.id)}
                    image={imageUrl}
                    badge={item.product.category || ""}
                    title={item.product.name}
                    price={price}
                    quantity={item.quantity}
                    selectedSize={item.selected_size}
                    selectedColorHex={item.selected_color_hex}
                    selectedColorName={item.selected_color_name}
                    onDecrease={() => handleDecreaseQuantity(item.id)}
                    onIncrease={() => handleIncreaseQuantity(item.id)}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                );
              })}
          </div>
          <div className="px-6">
            {eligibleForFreeTshirt && (
              <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
                <div className="text-sm text-gray-800 font-medium mb-2">
                  You received 1 free t-shirt for your $1500+ order. Please
                  select your size.
                </div>
                <SizeSelection
                  defaultSize={selectedSize}
                  onChange={(s) => setSelectedSize(s)}
                />
              </div>
            )}
          </div>
          <div className="px-6 py-4">
            <div className="bg-[#f6fafd] rounded-xl border border-[#e5e7eb] p-4 mb-4">
              <div className="font-semibold mb-2">Billing</div>
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>${selectedSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Shipping Fee</span>
                <span>${selectedShippingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold mb-1">
                <span>Total</span>
                <span>${selectedTotal.toFixed(2)}</span>
              </div>
              <div className="text-xs text-[#7b8ca3] mb-2">
                Tax also included
              </div>
              <label className="flex items-center gap-2 mb-2 cursor-pointer mt-5 ">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={recurring}
                  onChange={() => setRecurring((s) => !s)}
                />
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
          isSubscription={recurring}
          freeTshirtSize={eligibleForFreeTshirt ? selectedSize : null}
        />
      )}
    </>,
    // render modal at the end of document body so it escapes parent stacking contexts
    document.body
  );
}
export default ShoppingCartModal;

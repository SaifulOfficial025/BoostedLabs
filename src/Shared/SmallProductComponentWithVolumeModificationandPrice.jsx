import React, { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

function SmallProductComponentWithVolumeModificationandPrice({
  checked = false,
  onCheck = () => {},
  image,
  title = "Product Name",
  price = 0,
  quantity = 1,
  onRemove = () => {},
}) {
  // Use dummy image if not provided
  const productImage =
    image ||
    `${
      import.meta.env && import.meta.env.BASE_URL
        ? import.meta.env.BASE_URL
        : "/"
    }dummyproduct.png`;
  // Local state for quantity and checked
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [isChecked, setIsChecked] = useState(checked);

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity(localQuantity - 1);
    }
  };
  const handleIncrease = () => {
    setLocalQuantity(localQuantity + 1);
  };
  const handleCheck = (checkedVal) => {
    setIsChecked(checkedVal);
    onCheck(checkedVal);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 bg-white rounded-xl border border-gray-200 p-3 sm:p-4 mb-3 shadow-sm">
      <div className="flex items-start sm:items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => handleCheck(e.target.checked)}
          className="w-6 h-6 sm:w-5 sm:h-5 accent-blue-500 border-2 border-gray-300 rounded cursor-pointer mt-1 sm:mt-2"
        />
      </div>

      <div className="flex flex-1 flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
        <div className="relative">
          <img
            src={productImage}
            alt={title}
            className="w-24 h-20 sm:w-20 sm:h-16 object-contain rounded-lg border border-gray-200 bg-white mx-auto sm:mx-0"
            onError={(e) => {
              // Fallback to public dummy image or a tiny SVG if loading fails
              const fallback = `${
                import.meta.env && import.meta.env.BASE_URL
                  ? import.meta.env.BASE_URL
                  : "/"
              }dummyproduct.png`;
              if (e.currentTarget.src !== fallback) {
                e.currentTarget.src = fallback;
              } else {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="%23f3f4f6" /><text x="100" y="65" font-size="14" text-anchor="middle" fill="%23999">no image</text></svg>';
              }
            }}
          />
        </div>

        <div className="flex flex-col justify-center flex-1 min-w-0 text-center sm:text-left">
          <div className="font-semibold text-base text-gray-900 mb-1 truncate">
            {title}
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <button
              className="w-9 h-9 sm:w-8 sm:h-8 border border-gray-400 rounded flex items-center justify-center text-lg font-bold bg-gray-50 hover:bg-gray-100 transition"
              onClick={handleDecrease}
              aria-label="Decrease quantity"
              type="button"
            >
              -
            </button>
            <span className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-base font-semibold bg-gray-50 border border-transparent">
              {localQuantity}
            </span>
            <button
              className="w-9 h-9 sm:w-8 sm:h-8 border border-gray-400 rounded flex items-center justify-center text-lg font-bold bg-gray-50 hover:bg-gray-100 transition"
              onClick={handleIncrease}
              aria-label="Increase quantity"
              type="button"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:items-end items-center justify-between h-full mt-2 sm:mt-0 min-w-[80px]">
          <span className="font-bold text-base text-gray-900">
            ${(price * localQuantity).toFixed(2)}
          </span>
          <span className="text-gray-400 text-xs">
            ${price.toFixed(2)} × {localQuantity}
          </span>
          <button
            className="mt-2 text-red-500 text-xl hover:text-red-700 transition"
            onClick={onRemove}
            aria-label="Remove product"
            type="button"
          >
            <MdOutlineDeleteForever size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallProductComponentWithVolumeModificationandPrice;

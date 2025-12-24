import React, { useState } from "react";

function SizeandColor({
  availableSizes = [],
  availableColors = [],
  onSizeChange,
  onColorChange,
}) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSize = (size) => {
    setSelectedSize(size);
    if (onSizeChange) onSizeChange(size);
  };
  const handleColor = (colorHex) => {
    setSelectedColor(colorHex);
    if (onColorChange) onColorChange(colorHex);
  };

  // If no sizes or colors available, don't render
  if (availableSizes.length === 0 && availableColors.length === 0) {
    return null;
  }

  return (
    <div className="max-w-md bg-white rounded-lg mt-6">
      {availableSizes.length > 0 && (
        <>
          <h2 className="text-md font-bold mb-4">Choose Size</h2>
          <div className="flex gap-3 mb-6">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSize(size)}
                className={`px-4 py-2 rounded border font-semibold transition-all
                  ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-300 hover:border-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </>
      )}

      {availableColors.length > 0 && (
        <>
          <h2 className="text-md font-bold mb-4">Choose Color</h2>
          <div className="flex gap-4 mb-6">
            {availableColors.map((color) => (
              <button
                key={color.hex}
                onClick={() => handleColor(color.hex)}
                className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all
                  ${
                    selectedColor === color.hex
                      ? "border-black scale-110"
                      : "border-gray-300 hover:border-black"
                  }`}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
                title={color.name}
              >
                {selectedColor === color.hex && (
                  <span className="text-xs font-bold text-white drop-shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SizeandColor;

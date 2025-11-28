import React, { useState } from "react";

export default function SizeSelection({
  sizes = ["S", "L", "M", "XL", "XXL"],
  defaultSize = "S",
  onChange,
  label = "Size:",
}) {
  const [selected, setSelected] = useState(defaultSize);

  function handleSelect(size) {
    setSelected(size);
    if (onChange) onChange(size);
  }

  return (
    <div className="flex items-center gap-3 font-sans">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        {sizes.map((s) => {
          const active = selected === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => handleSelect(s)}
              className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200 ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
              aria-pressed={active}
              aria-label={`Select size ${s}`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

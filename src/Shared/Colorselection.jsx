import React, { useState } from "react";

const DEFAULT_COLORS = [
  { name: "Brown", value: "#3b2f24" },
  { name: "Light", value: "#f3f4f6" },
  { name: "Blue", value: "#4b86a8" },
  { name: "Dark", value: "#0b1115" },
];

export default function Colorselection({
  colors = DEFAULT_COLORS,
  defaultColor = DEFAULT_COLORS[0].value,
  onChange,
  label = "Color:",
}) {
  const [selected, setSelected] = useState(defaultColor);

  function handleSelect(value) {
    setSelected(value);
    if (onChange) onChange(value);
  }

  return (
    <div className="flex items-center gap-3 font-sans">
      <span className="text-sm text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        {colors.map((c) => {
          const active = selected === c.value;
          // for very light colors ensure visible border
          const needsBorder = c.value === "#f3f4f6" || c.value === "#ffffff";
          return (
            <button
              key={c.value}
              type="button"
              onClick={() => handleSelect(c.value)}
              className={`w-8 h-6 rounded-md flex-shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                active ? "ring-2 ring-black" : "ring-0"
              }`}
              aria-pressed={active}
              aria-label={`Select color ${c.name}`}
              title={c.name}
              style={{
                backgroundColor: c.value,
                border: active
                  ? "2px solid #000"
                  : needsBorder
                  ? "1px solid #d1d5db"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

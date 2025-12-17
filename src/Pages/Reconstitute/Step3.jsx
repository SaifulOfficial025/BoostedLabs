import React from "react";

function Step3() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Step 3 — Mix Gently
      </div>
      <ul className="space-y-3 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Gently swirl in your hand</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Do NOT shake</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Solution will turn clear within seconds</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>This means the peptide has fully dissolved</span>
        </li>
      </ul>
    </div>
  );
}

export default Step3;
